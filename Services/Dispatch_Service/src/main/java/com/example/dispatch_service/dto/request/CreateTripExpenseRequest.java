package com.example.dispatch_service.dto.request;

import com.example.dispatch_service.models.ExpenseType;
import com.example.dispatch_service.models.Trip;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTripExpenseRequest {


    private ExpenseType expenseType;

    private BigDecimal amount;

    private String description;

    private String receiptUrl;
}