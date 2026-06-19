package com.example.customer_service.services;

import com.example.customer_service.dto.request.CustomerRequest;
import com.example.customer_service.dto.response.CustomerResponse;
import com.example.customer_service.exception.AppException;
import com.example.customer_service.exception.ErrorCode;
import com.example.customer_service.mapper.CustomerMapper;
import com.example.customer_service.models.Customer;
import com.example.customer_service.repositories.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public CustomerResponse createCustomer(CustomerRequest customerRequest) {
        Customer customer = customerMapper.toCustomer(customerRequest);
        try{
            customerRepository.save(customer);

        }catch (Exception e){
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
        return customerMapper.toCustomerResponse(customer);
    }

    public List<CustomerResponse> findAllCustomers() {
        List<CustomerResponse> customerResponses = new ArrayList<>();
        List<Customer> customers = customerRepository.findAll();
        customers.forEach(customer -> customerResponses.add(customerMapper.toCustomerResponse(customer)) );
        return customerResponses;
    }
}
