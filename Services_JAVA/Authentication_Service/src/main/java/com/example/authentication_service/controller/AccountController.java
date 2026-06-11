package com.example.authentication_service.controller;

import com.example.authentication_service.exception.RoleNotFoundException;
import com.example.authentication_service.exception.UserAlreadyExistsException;
import com.example.authentication_service.mapper.AccountMapper;
import com.example.authentication_service.models.dto.request.AccountLogin;
import com.example.authentication_service.models.dto.request.AccountRequest;
import com.example.authentication_service.models.dto.request.AccountSignIn;
import com.example.authentication_service.models.dto.request.AccountSignUp;
import com.example.authentication_service.models.dto.response.AccountResponse;
import com.example.authentication_service.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;
    private final AccountMapper accountMapper;


    @PostMapping("/register")
    public ResponseEntity<AccountResponse> registerAccount(@RequestBody @Valid AccountRequest accountRequest) {
        AccountResponse account_response =  accountMapper.toAccountResponse(accountService.saveAccount(accountRequest));
        return ResponseEntity.ok(account_response);
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> loginAccount(@RequestBody AccountLogin accountLogin) {
        return ResponseEntity.ok(accountService.checkPassword(accountLogin.getUsername(), accountLogin.getPassword()));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> signUp(@RequestBody @Valid AccountSignUp accountSignUp) throws RoleNotFoundException, UserAlreadyExistsException {
        return accountService.signUp(accountSignUp);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> signIn(@RequestBody @Valid AccountSignIn accountSignIn) {
        return accountService.signIn(accountSignIn);
    }

}
