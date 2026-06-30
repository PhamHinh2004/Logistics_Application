package com.example.authentication_service.service;

import com.example.authentication_service.components.RoleFactory;
import com.example.authentication_service.exception.AppException;
import com.example.authentication_service.exception.ErrorCode;
import com.example.authentication_service.exception.RoleNotFoundException;
import com.example.authentication_service.exception.UserAlreadyExistsException;
import com.example.authentication_service.jwt.JwtUtils;
import com.example.authentication_service.mapper.AccountMapper;
import com.example.authentication_service.models.Account;
import com.example.authentication_service.models.StatusAccount;
import com.example.authentication_service.models.dto.request.AccountSignIn;
import com.example.authentication_service.models.dto.request.AccountSignUp;
import com.example.authentication_service.models.RefreshToken;
import com.example.authentication_service.models.dto.response.AccountResponse;
import com.example.authentication_service.models.dto.response.SignInResponse;
import com.example.authentication_service.repository.AccountRepository;
import com.example.authentication_service.repository.RefreshTokenRepository;
import com.example.authentication_service.service.RefreshTokenService;
import com.example.authentication_service.userdetails.UserDetailsImpl;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountMapper accountMapper;
    private final RoleFactory roleFactory;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils  jwtUtils;
    private final RedisBloomFilterService redisBloomFilterService;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;


    @Transactional
    public ResponseEntity<?> signUp(AccountSignUp accountSignUp) throws AppException, RoleNotFoundException, UserAlreadyExistsException {
        if (redisBloomFilterService.mightExistUsername(accountSignUp.getUsername()) && accountRepository.existsByUsername(accountSignUp.getUsername())) {
            throw new UserAlreadyExistsException("Username is already taken!");
        }
        else if (redisBloomFilterService.mightExistEmail(accountSignUp.getEmail()) && accountRepository.existsByEmail(accountSignUp.getEmail())) {
            throw new UserAlreadyExistsException("Email is already in use!");
        }
        Account account = accountMapper.toAccountFromSignUp(accountSignUp);
        account.setActive(true);
        account.setStatusAccount(StatusAccount.Active);
        account.setPassword(passwordEncoder.encode(accountSignUp.getPassword()));
        account.setRole(roleFactory.getInstance(accountSignUp.getRole() != null ? accountSignUp.getRole() : "user"));

        accountRepository.save(account);
        redisBloomFilterService.addUsername(accountSignUp.getUsername());
        redisBloomFilterService.addEmail(accountSignUp.getEmail());
        return ResponseEntity.ok("User registered successfully!");
    }

    public ResponseEntity<?> signIn(AccountSignIn accountSignIn) {
        try {
            // 1
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(accountSignIn.getUsername(), accountSignIn.getPassword()));

            //2
            SecurityContextHolder.getContext().setAuthentication(authentication);

            //3
            String jwt = jwtUtils.generateJwtToken(authentication);

            //4
            UserDetailsImpl details = (UserDetailsImpl) authentication.getPrincipal();

            //5
            String role = details.getAuthorities().iterator().next().getAuthority();
            
            // Generate Refresh Token
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(details.getId());

            //
            SignInResponse signInResponse = SignInResponse.builder()
                    .username(details.getUsername())
                    .email(details.getEmail())
                    .isActive(details.isActive())
                    .phone(details.getPhone())
                    .role(role)
                    .statusAccount(details.getStatusAccount())
                    .createCustomer(details.getCreateCustomer())
                    .refreshToken(refreshToken.getToken())
                    .accessToken(jwt)
                    .build();
            return ResponseEntity.ok(signInResponse);
        }catch (Exception e) {
            throw new AppException(ErrorCode.INVALID_PASSWORD);
        }
    }

    public ResponseEntity<?> refreshToken(String requestRefreshToken) {
        return refreshTokenRepository.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getAccount)
                .map(account -> {
                    String token = jwtUtils.generateJwtTokenFromId(account.getId());
                    RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(account.getId());
                    
                    java.util.Map<String, String> response = new java.util.HashMap<>();
                    response.put("accessToken", token);
                    response.put("refreshToken", newRefreshToken.getToken());
                    return ResponseEntity.ok(response);
                })
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @PostConstruct
    public void warmUp() {

        List<Account> accounts = accountRepository.findAllProjectedBy();

        redisBloomFilterService.addAllUsernames(
                accounts.stream()
                        .map(Account::getUsername)
                        .filter(Objects::nonNull)
                        .toList()
        );

        redisBloomFilterService.addAllEmails(
                accounts.stream()
                        .map(Account::getEmail)
                        .filter(Objects::nonNull)
                        .toList()
        );
    }

    public boolean checkExistUsername(String username){
        return redisBloomFilterService.mightExistUsername(username) && accountRepository.existsByUsername(username);
    }

    public boolean checkExistEmail(String email){
        return redisBloomFilterService.mightExistEmail(email) && accountRepository.existsByEmail(email);
    }

    public AccountResponse getAccount(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Account account = accountRepository.findById(userDetails.getId()).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        return accountMapper.toAccountResponse(account);
    }

    public AccountResponse updateCreatedCustomer(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Account account = accountRepository.findById(userDetails.getId()).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        account.setCreateCustomer(true);
        return accountMapper.toAccountResponse(accountRepository.save(account));
    }

    public AccountResponse updateRole(Authentication authentication, String role) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Account account = accountRepository.findById(userDetails.getId()).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        account.setRole(roleFactory.getInstance(role));
        return accountMapper.toAccountResponse(accountRepository.save(account));
    }
}
