package com.example.dispatch_service.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Lazy;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trips")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String tripCode;

    @Column(nullable = false)
    private String orderId;

    @Column(nullable = false)
    private String vehicleId;

    @Column(nullable = false)
    private String driverId;

    @Column(nullable =false)
    private String dispatcherId;

    @Enumerated(EnumType.STRING)
    private TripStatus status;

    private LocalDateTime dispatchedAt;

    private LocalDateTime driverAcceptedAt;

    private LocalDateTime pickupAt;

    private LocalDateTime deliveredAt;

    @Column(columnDefinition = "TEXT")
    private String note;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<TripExpense> expenses = new ArrayList<>();
}