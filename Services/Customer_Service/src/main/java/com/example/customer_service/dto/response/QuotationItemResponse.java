package com.example.customer_service.dto.response;

import com.example.customer_service.models.ContainerType;
import com.example.customer_service.models.Quotation;
import com.example.customer_service.models.SizeFt;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuotationItemResponse {
    private String id;
    private Quotation quotation;
    private double weight;
    private String pickup_address;
    private String delivery_address;
    private float distant;
    private double unit_price;
    private ContainerType container_type;
    private String color;
    private String owner_company;
    private SizeFt size_ft;
    private LocalDate pickup_date;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
