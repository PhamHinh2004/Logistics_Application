package com.example.customer_service.dto.request;



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
    private String destination;
    private String cargoType;
    private double weight;
    private float distant;
    private double basePrice;
    private double totalPrice;
    private String status;
    private LocalDateTime valid_at;
}
