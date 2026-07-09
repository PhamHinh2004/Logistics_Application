package com.example.dispatch_service.services;

import com.example.dispatch_service.dto.request.CreateTripRequest;
import com.example.dispatch_service.dto.request.UpdateTripRequest;
import com.example.dispatch_service.dto.response.TripResponse;
import com.example.dispatch_service.mapper.TripMapper;
import com.example.dispatch_service.models.Trip;
import com.example.dispatch_service.repositories.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository tripRepository;
    private final TripMapper tripMapper;


    public TripResponse createTrip(CreateTripRequest request) {

        Trip trip = tripMapper.toTrip(request);

        return tripMapper.toTripResponse(
                tripRepository.save(trip)
        );
    }


    public TripResponse getTripById(String id) {

        Trip trip = tripRepository.findById(Integer.valueOf(id))
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        return tripMapper.toTripResponse(trip);
    }

    public List<TripResponse> getAllTrips() {

        return tripRepository.findAll()
                .stream()
                .map(tripMapper::toTripResponse)
                .toList();
    }


    public TripResponse updateTrip(String id, UpdateTripRequest request) {

        Trip trip = tripRepository.findById(Integer.valueOf(id))
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        trip.setStatus(request.getStatus());
        trip.setDriverAcceptedAt(request.getDriverAcceptedAt());
        trip.setPickupAt(request.getPickupAt());
        trip.setDeliveredAt(request.getDeliveredAt());
        trip.setNote(request.getNote());

        return tripMapper.toTripResponse(
                tripRepository.save(trip)
        );
    }

    public void deleteTrip(String id) {

        tripRepository.deleteById(Integer.valueOf(id));

    }
}
