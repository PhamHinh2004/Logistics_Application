package com.example.authentication_service.repository;

import com.example.authentication_service.models.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends MongoRepository<Account, String> {
    Account findByUsername(String username);
    Account findByUsernameAndPassword(String username, String password);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
