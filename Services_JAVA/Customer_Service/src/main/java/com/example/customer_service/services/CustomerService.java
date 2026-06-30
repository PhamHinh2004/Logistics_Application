package com.example.customer_service.services;

import com.example.customer_service.dto.request.CustomerRequest;
import com.example.customer_service.dto.response.CustomerResponse;
import com.example.customer_service.exception.AppException;
import com.example.customer_service.exception.ErrorCode;
import com.example.customer_service.mapper.CustomerMapper;
import com.example.customer_service.models.Customer;
import com.example.customer_service.models.Gender;
import com.example.customer_service.repositories.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public CustomerResponse createCustomer(CustomerRequest customerRequest) {
        Customer customer = customerMapper.toCustomer(customerRequest);
        customer.setGender(handlingChangeGender(customerRequest.getGender()));
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

    public Gender handlingChangeGender(String gender) {
        if (gender.equalsIgnoreCase("male")) {
            return Gender.MALE;
        } else if (gender.equalsIgnoreCase("female")) {
            return Gender.FEMALE;
        }else if (gender.equalsIgnoreCase("other")) {
            return Gender.OTHER;
        }
        else {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
    }

}
