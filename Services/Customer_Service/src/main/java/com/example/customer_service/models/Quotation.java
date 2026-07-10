package com.example.customer_service.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "quotations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quotation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private int quoteCode;
    private String origin;
    private String cargoType;
    private double basePrice;
    private double totalPrice;
    @Enumerated(EnumType.STRING)
    private StatusQuotation status;
    private LocalDateTime created_At;
    private LocalDateTime updated_At;
    private LocalDateTime valid_at;
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    @OneToMany(mappedBy = "quotation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuotationItem> quotationItems;
}
