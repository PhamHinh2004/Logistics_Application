package com.example.customer_service.mapper;

import com.example.customer_service.dto.request.CustomerRequest;
import com.example.customer_service.dto.response.CustomerResponse;
import com.example.customer_service.models.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "created_At", ignore = true)
    @Mapping(target = "updated_At", ignore = true)
    Customer toCustomer(CustomerRequest customerRequest);


    CustomerResponse toCustomerResponse(Customer customer);
}
