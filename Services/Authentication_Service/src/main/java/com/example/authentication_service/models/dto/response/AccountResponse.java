package com.example.authentication_service.models.dto.response;

import com.example.authentication_service.models.Role;
import com.example.authentication_service.models.StatusAccount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountResponse {
    private String id;
    private String username;
    private String email;
    private boolean isActive;
    private String phone;
    private StatusAccount statusAccount;
    private String provider;    // "google", "github", hoặc "local"
    private String providerId;  // ID từ provider
    private boolean createCustomer;
    private Role role;
}
