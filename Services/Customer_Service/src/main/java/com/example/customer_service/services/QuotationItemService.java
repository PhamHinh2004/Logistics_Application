package com.example.customer_service.services;

import com.example.customer_service.dto.request.QuotationItemRequest;
import com.example.customer_service.dto.response.QuotationItemResponse;
import com.example.customer_service.dto.response.QuotationResponse;
import com.example.customer_service.models.Quotation;
import com.example.customer_service.models.QuotationItem;
import com.example.customer_service.repositories.QuotationItemRepository;
import com.example.customer_service.repositories.QuotationRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class QuotationItemService {
    private final QuotationItemRepository quotationItemRepository;
    private final QuotationRepository  quotationRepository;
    public QuotationItemResponse  createQuotationItem(String id,QuotationItemRequest request) {
        Quotation quotation = quotationRepository.findQuotationById(id);
        if (quotation == null) {
            throw new RuntimeException("Quotation not found");
        }

        QuotationItem quotationItem = QuotationItem.builder()
                .quotation(quotation)
                .weight(request.getWeight())
                .pickup_address(request.getPickup_address())
                .delivery_address(request.getDelivery_address())
                .distant(request.getDistant())
                .unit_price(request.getUnit_price())
                .container_type(request.getContainer_type())
                .color(request.getColor())
                .owner_company(request.getOwner_company())
                .size_ft(request.getSize_ft())
                .created_at(LocalDateTime.now())
                .updated_at(LocalDateTime.now())
                .build();
        quotationItem =  quotationItemRepository.save(quotationItem);
        return QuotationItemResponse.builder()
                .id(quotationItem.getId())
                .weight(quotationItem.getWeight())
                .pickup_address(quotationItem.getPickup_address())
                .delivery_address(quotationItem.getDelivery_address())
                .distant(quotationItem.getDistant())
                .unit_price(quotationItem.getUnit_price())
                .container_type(quotationItem.getContainer_type())
                .color(quotationItem.getColor())
                .owner_company(quotationItem.getOwner_company())
                .size_ft(quotationItem.getSize_ft())
                .created_at(quotationItem.getCreated_at())
                .updated_at(quotationItem.getUpdated_at())
                .build();
    }
}
