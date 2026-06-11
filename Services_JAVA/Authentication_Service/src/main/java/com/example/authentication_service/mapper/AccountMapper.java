package com.example.authentication_service.mapper;

import com.example.authentication_service.models.Account;
import com.example.authentication_service.models.dto.request.AccountRequest;
import com.example.authentication_service.models.dto.request.AccountSignUp;
import com.example.authentication_service.models.dto.response.AccountResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    AccountResponse toAccountResponse(Account account);
    Account toAccount(AccountRequest accountRequest);
    @Mapping(target = "roles", ignore = true)
    Account toAccountFromSignUp(AccountSignUp accountSignUp);
}
