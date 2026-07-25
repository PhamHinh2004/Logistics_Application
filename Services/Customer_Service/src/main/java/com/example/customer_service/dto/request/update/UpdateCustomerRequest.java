package com.example.customer_service.dto.request.update;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCustomerRequest {
    private String companyName;
    private String contactName;
    private String contactEmail;
    private String address;
    private String note;
    private String gender;
}
