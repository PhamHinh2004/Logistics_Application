package com.example.authentication_service.models.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountRequest {
    @NotNull
    @Size(min = 8, message = "Username must be at least 8 characters long")
    private String username;
    @NotNull
    @Size(min = 3, message = "Password must be at least 8 characters long")
    private String password;
}
