package com.example.authentication_service.models.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiResponseDto<T> {
    private String  message;
    private String status;
    private T response;
}
