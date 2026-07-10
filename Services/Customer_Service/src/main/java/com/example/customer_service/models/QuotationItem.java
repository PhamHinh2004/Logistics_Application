package com.example.customer_service.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "quotation_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuotationItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quotation_id")
    private Quotation quotation;
    private double weight;
    private String pickup_address;
    private String delivery_address;
    private float distant;
    private double unit_price;
    @Enumerated(EnumType.STRING)
    private ContainerType container_type;
    private String color;
    private String owner_company;
    private LocalDate pickup_date;
    @Enumerated(EnumType.STRING)
    private SizeFt size_ft;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
