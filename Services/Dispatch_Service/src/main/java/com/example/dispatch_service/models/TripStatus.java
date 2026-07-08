package com.example.dispatch_service.models;

import lombok.Getter;

@Getter
public enum TripStatus {
    ASSIGNED,
    DRIVER_ACCEPTED,
    PICKING_UP,
    IN_TRANSIT,
    DELIVERED,
    FAILED,
}
