package com.example.customer_service.repositories;

import com.example.customer_service.models.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuotationRepository extends JpaRepository<Quotation, String> {
    Quotation findQuotationById(String id);
}
