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
    @Column(name = "weight_kg")
    private double weight;
    @Column(name = "distant_km")
    private float distant;
    private String cargo_type;
    private String delivery_address;
    private double delivery_lat;
    private double delivery_lng;
    private String pickup_address;
    private double pickup_lat;
    private double pickup_lng;
    @Enumerated(EnumType.STRING)
    private ContainerType container_type;
    @Enumerated(EnumType.STRING)
    private SizeFt size_ft;
    private String color;
    private String owner_company;
    private double unit_price;
    private String note;
    private LocalDate pickup_date;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
