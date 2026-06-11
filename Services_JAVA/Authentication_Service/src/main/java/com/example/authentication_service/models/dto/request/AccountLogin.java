package com.example.authentication_service.models.dto.request;

import lombok.Data;

@Data
public class AccountLogin {
    private String username;
    private String password;
}
