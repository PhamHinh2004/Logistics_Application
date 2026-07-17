package com.example.customer_service.controllers;

import com.example.customer_service.dto.ApiResponseDto;
import com.example.customer_service.dto.request.create.QuotationItemRequest;
import com.example.customer_service.services.QuotationItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quotation-items")
@RequiredArgsConstructor
public class QuotationItemController {

    private final QuotationItemService quotationItemService;

    @PostMapping
    public ResponseEntity<ApiResponseDto<?>> createQuotationItem(@RequestBody QuotationItemRequest request, @RequestParam String quotationId) {
        try {
            var response = quotationItemService.createQuotationItem(quotationId, request);
            return ResponseEntity.ok(new ApiResponseDto<>("Quotation item created successfully", "success", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponseDto<>(e.getMessage(), "error", null));
        }
    }

}
