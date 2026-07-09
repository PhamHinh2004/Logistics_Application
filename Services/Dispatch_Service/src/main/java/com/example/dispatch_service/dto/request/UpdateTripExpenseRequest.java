package com.example.dispatch_service.dto.request;

import com.example.dispatch_service.models.ExpenseType;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateTripExpenseRequest {

    private ExpenseType expenseType;

    private BigDecimal amount;

    private String description;

    private String receiptUrl;
}