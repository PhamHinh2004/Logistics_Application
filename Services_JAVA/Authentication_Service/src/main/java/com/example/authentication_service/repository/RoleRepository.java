package com.example.authentication_service.repository;

import com.example.authentication_service.models.Role;
import com.example.authentication_service.models.RoleOptions;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role,String> {
    Role findByName(RoleOptions roleOptions);
}
