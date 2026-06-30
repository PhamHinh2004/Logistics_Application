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
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;
    @PostMapping("/auth/register")
    public ResponseEntity<?> signUp(@RequestBody @Valid AccountSignUp accountSignUp) throws RoleNotFoundException, UserAlreadyExistsException {
        return accountService.signUp(accountSignUp);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> signIn(@RequestBody @Valid AccountSignIn accountSignIn) {
        return accountService.signIn(accountSignIn);
    }

    @PostMapping("/auth/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody java.util.Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        if (refreshToken == null || refreshToken.isEmpty()) {
            return ResponseEntity.badRequest().body("Refresh token is required");
        }
        return accountService.refreshToken(refreshToken);
    }

    @GetMapping("/check-username")
    public ResponseEntity<ApiResponseDto<Boolean>> checkUsername(@RequestParam("username") String username){
        return ResponseEntity.ok(new ApiResponseDto<>("Check username", "success", accountService.checkExistUsername(username)));
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam("email") String email){
        return ResponseEntity.ok(accountService.checkExistEmail(email));
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<AccountResponse>> getAccount(Authentication authentication){
        return ResponseEntity.ok(new ApiResponseDto<>("Get account", "success", accountService.getAccount(authentication)));
    }
    @PatchMapping("/update-createdCustomer")
    public ResponseEntity<ApiResponseDto<AccountResponse>> updateCreatedCustomer(Authentication authentication){
        return ResponseEntity.ok(new ApiResponseDto<>("Update created customer", "success", accountService.updateCreatedCustomer(authentication)));
    }
    @PatchMapping("/update-role")
    public ResponseEntity<ApiResponseDto<AccountResponse>> updateRole(Authentication authentication, @RequestParam String role){
        return ResponseEntity.ok(new ApiResponseDto<>("Update role", "success", accountService.updateRole(authentication, role)));
    }
}
