package com.example.customer_service.services;

import com.example.customer_service.dto.request.QuotationRequest;
import com.example.customer_service.dto.response.QuotationResponse;
import com.example.customer_service.exception.AppException;
import com.example.customer_service.exception.ErrorCode;
import com.example.customer_service.models.Customer;
import com.example.customer_service.models.Quotation;
import com.example.customer_service.repositories.CustomerRepository;
import com.example.customer_service.repositories.QuotationItemRepository;
import com.example.customer_service.repositories.QuotationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class QuotationService {
    private final QuotationRepository quotationRepository;
    private final CustomerRepository customerRepository;

    public QuotationResponse createQuotation(String customerId, QuotationRequest quotationRequest) {
        Customer customer = customerRepository.findCustomerById(Integer.parseInt(customerId));
        if (customer == null) {
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        Quotation quotation = Quotation.builder()
                .quoteCode(quotationRequest.getQuoteCode())
                .origin(quotationRequest.getOrigin())
                .cargoType(quotationRequest.getCargoType())
                .basePrice(quotationRequest.getBasePrice())
                .totalPrice(quotationRequest.getTotalPrice())
                .status(quotationRequest.getStatus())
                .created_At(LocalDateTime.now())
                .updated_At(LocalDateTime.now())
                .valid_at(LocalDateTime.now().plusDays(1))
                .customer(customer)
                .build();

        quotation = quotationRepository.save(quotation);
        return QuotationResponse.builder()
                .id(quotation.getId())
                .quoteCode(quotation.getQuoteCode())
                .origin(quotation.getOrigin())
                .cargoType(quotation.getCargoType())
                .basePrice(quotation.getBasePrice())
                .totalPrice(quotation.getTotalPrice())
                .status(quotation.getStatus())
                .created_At(quotation.getCreated_At())
                .updated_At(quotation.getUpdated_At())
                .valid_at(quotation.getValid_at())
                .build();
    }
}
