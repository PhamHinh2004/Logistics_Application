package com.example.customer_service.dto.request.create;

import com.example.customer_service.models.ContainerType;
import com.example.customer_service.models.SizeFt;
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
    private float distant;
    private String cargo_type;
            private String delivery_address;
    private double delivery_lat;
    private double delivery_lng;
    private String pickup_address;
    private double pickup_lat;
    private double pickup_lng;
    private ContainerType container_type;
    private SizeFt size_ft;
    private String color;
    private String owner_company;
    private double unit_price;
    private String note;
    private LocalDate pickup_date;
}
