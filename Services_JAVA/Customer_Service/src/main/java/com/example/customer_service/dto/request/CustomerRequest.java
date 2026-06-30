package com.example.customer_service.dto.request;

import lombok.*;

import java.util.Date;

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
    private String user_id;
}
