package com.example.authentication_service.service;

import com.example.authentication_service.components.RoleFactory;
import com.example.authentication_service.exception.AppException;
import com.example.authentication_service.exception.ErrorCode;
import com.example.authentication_service.exception.RoleNotFoundException;
import com.example.authentication_service.exception.UserAlreadyExistsException;
import com.example.authentication_service.jwt.JwtUtils;
import com.example.authentication_service.mapper.AccountMapper;
import com.example.authentication_service.models.Account;
import com.example.authentication_service.models.dto.request.AccountRequest;
import com.example.authentication_service.models.dto.request.AccountSignIn;
import com.example.authentication_service.models.dto.request.AccountSignUp;
import com.example.authentication_service.models.dto.response.SignInResponse;
import com.example.authentication_service.repository.AccountRepository;
import com.example.authentication_service.userdetails.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountMapper accountMapper;
    private final RoleFactory roleFactory;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils  jwtUtils;
    public Account findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }


    public Account saveAccount(AccountRequest accountRequest) {
        if(accountRepository.existsByUsername(accountRequest.getUsername())){
            throw new AppException(ErrorCode.EXIST_ACCOUNT);
        }
        Account account = accountMapper.toAccount(accountRequest);
        account.setPassword(passwordEncoder.encode(accountRequest.getPassword()));
        return  accountRepository.save(account);
    }

    public boolean checkPassword(String username, String password) {
        boolean result = passwordEncoder.matches(password, accountRepository.findByUsername(username).getPassword());
        if (!result) {
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        return result;
    }

    public ResponseEntity<?> signUp(AccountSignUp accountSignUp) throws AppException, RoleNotFoundException, UserAlreadyExistsException {
        if (accountRepository.existsByUsername(accountSignUp.getUsername())) {
            throw new UserAlreadyExistsException("Username is already taken!");
        }
        else if (accountRepository.existsByEmail(accountSignUp.getEmail())) {
            throw new UserAlreadyExistsException("Email is already in use!");
        }
        Account account = accountMapper.toAccountFromSignUp(accountSignUp);
        account.setEnabled(true);
        account.setPassword(passwordEncoder.encode(accountSignUp.getPassword()));
        account.setRoles(roleFactory.determineRoles(accountSignUp.getRoles()));

        accountRepository.save(account);
        return ResponseEntity.ok("User registered successfully!");
    }

    public ResponseEntity<?> signIn(AccountSignIn accountSignIn) {
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
    }
}
