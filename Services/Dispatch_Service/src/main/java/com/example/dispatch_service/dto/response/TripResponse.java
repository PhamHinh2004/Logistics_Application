package com.example.dispatch_service.dto.response;

import com.example.dispatch_service.models.TripStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripResponse {

    private String id;

    private String tripCode;

    private String orderId;

    private String vehicleId;

    private String driverId;

    private String dispatcherId;

    private TripStatus status;

    private LocalDateTime dispatchedAt;

    private LocalDateTime driverAcceptedAt;

    private LocalDateTime pickupAt;

    private LocalDateTime deliveredAt;

    private String note;


}
