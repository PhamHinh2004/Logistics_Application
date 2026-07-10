package com.example.customer_service.repositories;

import com.example.customer_service.models.QuotationItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuotationItemRepository  extends JpaRepository<QuotationItem, String> {
}
