package com.example.dispatch_service.dto.request;

import com.example.dispatch_service.models.TripStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateTripRequest {

    private TripStatus status;

    private LocalDateTime driverAcceptedAt;

    private LocalDateTime pickupAt;

    private LocalDateTime deliveredAt;

    private String note;
}
