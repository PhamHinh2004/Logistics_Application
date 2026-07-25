package com.example.dispatch_service.mapper;

import com.example.dispatch_service.dto.request.CreateTripRequest;
import com.example.dispatch_service.dto.request.UpdateTripRequest;
import com.example.dispatch_service.dto.response.TripResponse;
import com.example.dispatch_service.models.Trip;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.cloud.openfeign.Targeter;

@Mapper(componentModel = "spring")
public interface TripMapper {



    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dispatchedAt", ignore = true)
    @Mapping(target = "driverAcceptedAt", ignore = true)
    @Mapping(target = "pickupAt", ignore = true)
    @Mapping(target = "deliveredAt", ignore = true)
    @Mapping(target = "tripCode", ignore = true)
    public Trip toTrip(CreateTripRequest request);

    @Mapping(target = "expenses", ignore = true)
    public TripResponse toTripResponse(Trip trip);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tripCode", ignore = true)
    @Mapping(target = "dispatchedAt", ignore = true)
    @Mapping(target = "expenses", ignore = true)
    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "vehicleId", ignore = true)
    @Mapping(target = "driverId", ignore = true)
    @Mapping(target = "dispatcherId", ignore = true)
    public Trip toTrip(UpdateTripRequest request);
}
