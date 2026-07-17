package com.example.customer_service.dto.request.create;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerRequest {
    private String companyName;
    private String contactName;
    private String contactEmail;
    private String address;
    private String note;
    private String gender;
    private String userId;
}
