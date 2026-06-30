package com.example.authentication_service.models.dto.response;

import com.example.authentication_service.models.Role;
import com.example.authentication_service.models.StatusAccount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class SignInResponse {
    private String username;
    private String email;
    private boolean isActive;
    private String phone;
    private StatusAccount statusAccount;
    private boolean createCustomer;
    private String role;
    private String refreshToken;
    private String accessToken;
}
