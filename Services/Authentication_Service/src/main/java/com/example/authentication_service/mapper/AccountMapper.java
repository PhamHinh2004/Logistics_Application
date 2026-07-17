package com.example.authentication_service.mapper;

import com.example.authentication_service.models.Account;
import com.example.authentication_service.models.dto.request.AccountSignUp;
import com.example.authentication_service.models.dto.response.AccountResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    @Mapping(target = "email", source = "email")
    @Mapping(target = "username", source = "username")
    @Mapping(target = "statusAccount", source = "statusAccount")
    @Mapping(target = "createCustomer", source = "createCustomer")
    @Mapping(target = "provider", source = "provider")
    @Mapping(target = "role", source = "role")
    @Mapping(target = "providerId", source = "providerId")
    AccountResponse toAccountResponse(Account account);
    @Mapping(target = "role", ignore = true)
    Account toAccountFromSignUp(AccountSignUp accountSignUp);
}
