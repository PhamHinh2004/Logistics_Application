package com.example.customer_service.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "quotations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quotation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int quoteCode;
    private String origin;
    private String destination;
    private String cargoType;
    private double weight;
    private float distant;
    private double basePrice;
    private double totalPrice;
    @Enumerated(EnumType.STRING)
    private StatusQuotation status;
    private Date created_At;
    private Date updated_At;
    private LocalDateTime valid_at;
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;
}
