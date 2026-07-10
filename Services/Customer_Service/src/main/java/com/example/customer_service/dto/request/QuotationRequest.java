package com.example.customer_service.dto.request;



import com.example.customer_service.models.StatusQuotation;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuotationRequest {
    private int quoteCode;
    private String origin;
    private String cargoType;
    private double basePrice;
    private double totalPrice;
    private StatusQuotation status;
}
