package com.example.authentication_service.repository;

import com.example.authentication_service.models.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends MongoRepository<Account, String> {
    Account findByUsername(String username);
    Account findByUsernameAndPassword(String username, String password);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    // Chỉ lấy username + email, không kéo toàn bộ document
    @Query(value = "{}", fields = "{ username: 1, email: 1, _id: 0 }")
    List<Account> findAllProjectedBy();
    Account findByEmail(String email);
}
