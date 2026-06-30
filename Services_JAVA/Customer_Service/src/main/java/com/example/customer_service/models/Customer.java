package com.example.customer_service.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "customers")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String companyName;
    private String contactName;
    private String contactEmail;
    private String address;
    private String note;
    @CurrentTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_At;
    @CurrentTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_At;
    private String user_id;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Quotation> quotations;
}
