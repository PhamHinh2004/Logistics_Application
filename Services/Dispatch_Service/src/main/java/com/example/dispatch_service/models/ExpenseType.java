package com.example.dispatch_service.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
public enum ExpenseType {
    FUEL,
    TOLL,
    PARKING,
    MAINTENANCE,
    OTHER
}