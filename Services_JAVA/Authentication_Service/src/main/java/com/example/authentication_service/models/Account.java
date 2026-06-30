package com.example.authentication_service.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "accounts")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account {
    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    private String password;
    @Indexed(unique = true)
    private String email;
    private boolean isActive;
    private String phone;
    private StatusAccount statusAccount;
    private String provider;    // "google", "github", hoặc "local"
    private String providerId;  // ID từ provider
    private boolean createCustomer;
    @DBRef
    private Role role;
}
