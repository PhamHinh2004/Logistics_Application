package com.example.customer_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Date created_At;
    private Date updated_At;
    private String user_id;
}
