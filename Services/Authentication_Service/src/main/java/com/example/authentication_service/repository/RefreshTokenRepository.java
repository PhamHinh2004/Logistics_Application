package com.example.authentication_service.repository;

import com.example.authentication_service.models.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByAccount_Id(String accountId);
    void deleteByToken(String token);
}
