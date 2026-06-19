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
import com.example.authentication_service.models.dto.response.SignInResponse;
import com.example.authentication_service.repository.AccountRepository;
import com.example.authentication_service.userdetails.UserDetailsImpl;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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


    public Account findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    public boolean checkPassword(String username, String password) {
        boolean result = passwordEncoder.matches(password, accountRepository.findByUsername(username).getPassword());
        if (!result) {
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        return result;
    }

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
        account.setRoles(roleFactory.determineRoles(accountSignUp.getRoles()));

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

            // 5
            List<String> roles = details.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .toList();
            //
            SignInResponse signInResponse = SignInResponse.builder()
                    .username(details.getUsername())
                    .email(details.getEmail())
                    .id(details.getId())
                    .roles(roles)
                    .token(jwt)
                    .type("Bearer")
                    .build();
            return ResponseEntity.ok(signInResponse);
        }catch (Exception e) {
            throw new AppException(ErrorCode.INVALID_PASSWORD);
        }
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

}
