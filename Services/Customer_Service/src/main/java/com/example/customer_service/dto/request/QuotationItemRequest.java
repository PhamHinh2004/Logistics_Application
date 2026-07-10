package com.example.customer_service.dto.request;

import com.example.customer_service.models.ContainerType;
import com.example.customer_service.models.SizeFt;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuotationItemRequest {
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
}
