package com.example.customer_service.controllers;

import com.example.customer_service.dto.ApiResponseDto;
import com.example.customer_service.dto.request.QuotationItemRequest;
import com.example.customer_service.dto.request.QuotationRequest;
import com.example.customer_service.dto.response.QuotationResponse;
import com.example.customer_service.services.QuotationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quotations")
public class QuotationController {
    private final QuotationService quotationService;



    @PostMapping
    public ResponseEntity<ApiResponseDto<QuotationResponse>> createQuotation(@RequestParam String customer_id,@RequestBody QuotationRequest quotationRequest) {
        QuotationResponse response = quotationService.createQuotation(customer_id, quotationRequest);
        return ResponseEntity.ok(new ApiResponseDto<>("Quotation created successfully", "success", response));
    }

}
