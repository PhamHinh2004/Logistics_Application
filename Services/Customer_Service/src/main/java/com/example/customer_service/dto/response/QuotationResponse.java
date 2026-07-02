package com.example.customer_service.dto.response;

import com.example.customer_service.models.StatusQuotation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuotationResponse {
    private int id;
    private String companyName;
    private String contactName;
    private String contactEmail;
    private String address;
    private String note;
    private Date created_At;
    private Date updated_At;
}
