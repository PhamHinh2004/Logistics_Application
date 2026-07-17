package com.example.customer_service.controllers;

import com.example.customer_service.dto.ApiResponseDto;
import com.example.customer_service.dto.request.create.CustomerRequest;
import com.example.customer_service.dto.request.update.UpdateCustomerRequest;
import com.example.customer_service.dto.response.CustomerResponse;
import com.example.customer_service.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/customers")
public class CustomerController {
    private final CustomerService customerService;
    @PostMapping
    public ResponseEntity<ApiResponseDto<CustomerResponse>> createCustomer(@RequestBody CustomerRequest customerRequest) {
        // Call the service layer to create a new customer
        CustomerResponse customerResponse = customerService.createCustomer(customerRequest);
        // Return the response with a success message
        ApiResponseDto<CustomerResponse> response = new ApiResponseDto<>("Customer created successfully", "success", customerResponse);
        return ResponseEntity.ok(response);
    }
    @GetMapping
    public ResponseEntity<ApiResponseDto<List<CustomerResponse>>> findAllCustomers() {
        return ResponseEntity.ok(new ApiResponseDto<>("Customers retrieved successfully", "success", customerService.findAllCustomers()));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponseDto<CustomerResponse>> findCustomerById(@PathVariable String userId) {
        return ResponseEntity.ok(new ApiResponseDto<>("Customer retrieved successfully", "success", customerService.findCustomerByUserId(userId)));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponseDto<CustomerResponse>> updateCustomer(@PathVariable String userId, @RequestBody UpdateCustomerRequest customerRequest) {
        // Call the service layer to update the customer
        CustomerResponse customerResponse = customerService.updateCustomer(userId, customerRequest);
        // Return the response with a success message
        ApiResponseDto<CustomerResponse> response = new ApiResponseDto<>("Customer updated successfully", "success", customerResponse);
        return ResponseEntity.ok(response);
        }

}
