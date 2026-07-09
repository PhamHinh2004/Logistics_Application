package com.example.dispatch_service.services;

import com.example.dispatch_service.dto.request.CreateTripExpenseRequest;
import com.example.dispatch_service.dto.request.UpdateTripExpenseRequest;
import com.example.dispatch_service.dto.response.TripExpenseResponse;
import com.example.dispatch_service.mapper.TripExpenseMapper;

import com.example.dispatch_service.models.TripExpense;
import com.example.dispatch_service.repositories.TripExpenseRepository;
import com.example.dispatch_service.repositories.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TripExpenseService {
    private final TripExpenseRepository tripExpenseRepository;
    private final TripExpenseMapper tripExpenseMapper;
    private final TripRepository tripRepository;


    public TripExpenseResponse createExpense(String tripId, CreateTripExpenseRequest request) {

        if(tripRepository.findById(Integer.valueOf(tripId)).isPresent()) {
            throw new RuntimeException("trip already exists for this trip");
        }
        TripExpense tripExpense = tripExpenseMapper.toTripExpense(request);
        tripExpense.setTrip(tripRepository.findById(Integer.valueOf(tripId)).get());
        return tripExpenseMapper.toTripExpenseResponse(
                tripExpenseRepository.save(tripExpense)
        );
    }

    public List<TripExpenseResponse> getExpensesByTrip(String tripId) {
        List<TripExpense> tripExpenses = tripExpenseRepository.findByTripId(tripId);
        List<TripExpenseResponse> tripExpenseResponses = new ArrayList<>();
        for (TripExpense tripExpense : tripExpenses) {
            tripExpenseResponses.add(tripExpenseMapper.toTripExpenseResponse(tripExpense));
        }
        return tripExpenseResponses;
    }

    public TripExpenseResponse updateExpense(String expenseId, UpdateTripExpenseRequest request) {
        TripExpense tripExpense = tripExpenseRepository.findById(Integer.valueOf(expenseId))
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        return tripExpenseMapper.toTripExpenseResponse(
                tripExpenseRepository.save(tripExpense)
        );
    }

    public void deleteExpense(String expenseId) {
        tripExpenseRepository.deleteById(Integer.valueOf(expenseId));
    }
}
