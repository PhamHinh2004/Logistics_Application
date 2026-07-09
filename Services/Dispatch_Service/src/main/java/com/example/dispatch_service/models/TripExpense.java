package com.example.dispatch_service.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "trip_expenses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripExpense {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @Enumerated(EnumType.STRING)
    private ExpenseType expenseType;

    private BigDecimal amount;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String receiptUrl;

    private LocalDateTime createdAt;
}