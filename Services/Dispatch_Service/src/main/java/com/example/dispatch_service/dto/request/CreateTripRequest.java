package com.example.dispatch_service.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTripRequest {
    private String orderId;

    private String vehicleId;

    private String driverId;

    private String dispatcherId;

    private String note;
}
