package com.example.customer_service.services;

import com.example.customer_service.dto.request.create.QuotationRequest;
import com.example.customer_service.dto.response.QuotationResponse;
import com.example.customer_service.exception.AppException;
import com.example.customer_service.exception.ErrorCode;
import com.example.customer_service.models.Customer;
import com.example.customer_service.models.Quotation;
import com.example.customer_service.models.QuotationItem;
import com.example.customer_service.repositories.CustomerRepository;
import com.example.customer_service.repositories.QuotationItemRepository;
import com.example.customer_service.repositories.QuotationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class QuotationService {
    private final QuotationRepository quotationRepository;
    private final CustomerRepository customerRepository;
    private final QuotationItemRepository quotationItemRepository;

    @Transactional
    public QuotationResponse createQuotation(String customerId, QuotationRequest quotationRequest) {
        Customer customer = customerRepository.findCustomerById(Integer.parseInt(customerId));
        if(customer == null) {
            throw new AppException(ErrorCode.CUSTOMER_NOT_FOUND);
        }

        Quotation quotation = quotationRepository.save(Quotation.builder()
                .customer(customer)
                        .quoteCode(quotationRequest.getQuoteCode())
                        .totalPrice(quotationRequest.getTotalPrice())
                .created_At(LocalDateTime.now())
                .updated_At(LocalDateTime.now())
                .status(quotationRequest.getStatus())
                .valid_at(LocalDateTime.now().plusDays(1))
                .build());

        quotationRequest.getQuotationItems().forEach(itemRequest -> {
            quotationItemRepository.save(
                    QuotationItem.builder()
                            .quotation(quotation)
                            .weight(itemRequest.getWeight())
                            .distant(itemRequest.getDistant())
                            .cargo_type(itemRequest.getCargo_type())
                            .delivery_address(itemRequest.getDelivery_address())
                            .delivery_lat(itemRequest.getDelivery_lat())
                            .delivery_lng(itemRequest.getDelivery_lng())
                            .pickup_address(itemRequest.getPickup_address())
                            .pickup_lat(itemRequest.getPickup_lat())
                            .pickup_lng(itemRequest.getPickup_lng())
                            .container_type(itemRequest.getContainer_type())
                            .size_ft(itemRequest.getSize_ft())
                            .color(itemRequest.getColor())
                            .unit_price(itemRequest.getUnit_price())
                            .owner_company(itemRequest.getOwner_company())
                            .pickup_date(itemRequest.getPickup_date())
                            .created_at(LocalDateTime.now())
                            .updated_at(LocalDateTime.now())
                            .build()
            );
        });
        return QuotationResponse.builder()
                .id(quotation.getId())
                .totalPrice(quotation.getTotalPrice())
                .quoteCode(quotation.getQuoteCode())
                .status(quotation.getStatus())
                .created_At(quotation.getCreated_At())
                .updated_At(quotation.getUpdated_At())
                .valid_at(quotation.getValid_at())
                .build();
    }
}
