package com.example.authentication_service.models.dto.request;

import com.example.authentication_service.models.StatusAccount;
import com.mongodb.lang.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class AccountSignUp {
    @NotBlank(message = "Username is required!")
    @Size(min = 3, message = "Username must have atleast 3 characters!")
    @Size(max = 20, message = "Username can have have atmost 20 characters!")
    private String username;

    @Email(message = "Email is not in valid format!")
    @NotBlank(message = "Email is required!")
    private String email;

    @NotBlank(message = "Password is required!")
    @Size(min = 8, message = "Password must have atleast 8 characters!")
    @Size(max = 20, message = "Password can have have atmost 20 characters!")
    private String password;
    @Nullable
    private String role;
    @Nullable
    private String phone;
    private String provider;    // "google", "github", hoặc "local"
    private String providerId;  // ID từ provider
}
