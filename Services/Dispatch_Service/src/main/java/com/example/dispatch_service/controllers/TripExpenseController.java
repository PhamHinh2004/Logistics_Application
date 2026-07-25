package com.example.dispatch_service.controllers;

import com.example.dispatch_service.dto.request.CreateTripExpenseRequest;
import com.example.dispatch_service.dto.request.UpdateTripExpenseRequest;
import com.example.dispatch_service.dto.response.TripExpenseResponse;
import com.example.dispatch_service.services.TripExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/expenses")
@RequiredArgsConstructor
public class TripExpenseController {

    private final TripExpenseService expenseService;

    @PostMapping
    public TripExpenseResponse createExpense(
            @PathVariable String tripId,
            @RequestBody CreateTripExpenseRequest request) {

        return expenseService.createExpense(tripId, request);
    }

    @GetMapping
    public List<TripExpenseResponse> getExpenses(
            @PathVariable String tripId) {

        return expenseService.getExpensesByTrip(tripId);
    }

    @PutMapping("/{expenseId}")
    public TripExpenseResponse updateExpense(
            @PathVariable String expenseId,
            @RequestBody UpdateTripExpenseRequest request) {

        return expenseService.updateExpense(expenseId, request);
    }

    @DeleteMapping("/{expenseId}")
    public void deleteExpense(
            @PathVariable String expenseId) {

        expenseService.deleteExpense(expenseId);
    }
}
