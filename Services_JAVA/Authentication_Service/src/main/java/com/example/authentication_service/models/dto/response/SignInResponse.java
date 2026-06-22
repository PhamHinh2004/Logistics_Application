package com.example.authentication_service.models.dto.response;

import com.example.authentication_service.models.StatusAccount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class SignInResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String username;
    private String email;
    private List<String> roles;
    private boolean isActive;
    private String phone;
    private StatusAccount statusAccount;
}
