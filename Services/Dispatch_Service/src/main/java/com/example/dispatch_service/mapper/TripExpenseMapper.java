package com.example.dispatch_service.mapper;

import com.example.dispatch_service.dto.request.CreateTripRequest;
import com.example.dispatch_service.dto.request.UpdateTripRequest;
import com.example.dispatch_service.dto.response.TripExpenseResponse;
import com.example.dispatch_service.dto.response.TripResponse;
import com.example.dispatch_service.models.TripExpense;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TripExpenseMapper {

    @Mapping(target = "trip", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    public TripExpense toTripExpense(Object request);

    public TripExpenseResponse toTripExpenseResponse(TripExpense tripExpense);


}
