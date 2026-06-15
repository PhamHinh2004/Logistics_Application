package com.example.authentication_service.controller;

import com.example.authentication_service.exception.RoleNotFoundException;
import com.example.authentication_service.exception.UserAlreadyExistsException;
import com.example.authentication_service.mapper.AccountMapper;
import com.example.authentication_service.models.dto.request.AccountSignIn;
import com.example.authentication_service.models.dto.request.AccountSignUp;
import com.example.authentication_service.models.dto.response.AccountResponse;
import com.example.authentication_service.models.dto.response.ApiResponseDto;
import com.example.authentication_service.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;
    private final AccountMapper accountMapper;
    @PostMapping("/auth/register")
    public ResponseEntity<?> signUp(@RequestBody @Valid AccountSignUp accountSignUp) throws RoleNotFoundException, UserAlreadyExistsException {
        return accountService.signUp(accountSignUp);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> signIn(@RequestBody @Valid AccountSignIn accountSignIn) {
        return accountService.signIn(accountSignIn);
    }

    @GetMapping("/check-username")
    public ResponseEntity<ApiResponseDto<Boolean>> checkUsername(@RequestParam("username") String username){
        return ResponseEntity.ok(new ApiResponseDto<>("Check username", "success", accountService.checkExistUsername(username)));
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam("email") String email){
        return ResponseEntity.ok(accountService.checkExistEmail(email));
    }
}
