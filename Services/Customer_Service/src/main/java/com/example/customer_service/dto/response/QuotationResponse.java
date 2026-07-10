package com.example.customer_service.dto.response;

import com.example.customer_service.models.StatusQuotation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuotationResponse {
    private String id;
    private int quoteCode;
    private String origin;
    private String cargoType;
    private double basePrice;
    private double totalPrice;
    private StatusQuotation status;
    private LocalDateTime created_At;
    private LocalDateTime updated_At;
    private LocalDateTime valid_at;
}
