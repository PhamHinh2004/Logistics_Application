package com.example.customer_service.dto.response;

import com.example.customer_service.models.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerResponse {
    private int id;
    private String companyName;
    private String contactName;
    private String contactEmail;
    private String address;
    private String note;
    private Gender gender;
    private String user_id;
    private Date created_At;
    private Date updated_At;
}
