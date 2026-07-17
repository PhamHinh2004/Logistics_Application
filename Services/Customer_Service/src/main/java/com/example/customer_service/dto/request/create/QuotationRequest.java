package com.example.customer_service.dto.request.create;



import com.example.customer_service.models.StatusQuotation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuotationRequest {
    private String quoteCode;
    private double totalPrice;
    private StatusQuotation status;
    private List<QuotationItemRequest> quotationItems;
}
