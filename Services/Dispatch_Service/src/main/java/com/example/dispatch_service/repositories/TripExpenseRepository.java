package com.example.dispatch_service.repositories;

import com.example.dispatch_service.models.TripExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripExpenseRepository extends JpaRepository<TripExpense, Integer> {
    List<TripExpense> findByTripId(String tripId);

}
