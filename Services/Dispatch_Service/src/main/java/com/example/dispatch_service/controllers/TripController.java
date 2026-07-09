package com.example.dispatch_service.controllers;

import com.example.dispatch_service.dto.request.CreateTripRequest;
import com.example.dispatch_service.dto.request.UpdateTripRequest;
import com.example.dispatch_service.dto.response.TripResponse;
import com.example.dispatch_service.services.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;

    @PostMapping
    public TripResponse createTrip(
            @RequestBody CreateTripRequest request) {

        return tripService.createTrip(request);
    }

    @GetMapping
    public List<TripResponse> getAllTrips() {

        return tripService.getAllTrips();
    }

    @GetMapping("/{id}")
    public TripResponse getTripById(
            @PathVariable String id) {

        return tripService.getTripById(id);
    }

    @PutMapping("/{id}")
    public TripResponse updateTrip(
            @PathVariable String id,
            @RequestBody UpdateTripRequest request) {

        return tripService.updateTrip(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTrip(
            @PathVariable String id) {

        tripService.deleteTrip(id);
    }

}
