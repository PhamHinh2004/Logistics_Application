package com.example.dispatch_service.dto.response;

import com.example.dispatch_service.models.ExpenseType;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripExpenseResponse {

    private String id;

    private ExpenseType expenseType;

    private BigDecimal amount;

    private String description;

    private String receiptUrl;

    private LocalDateTime createdAt;
}
