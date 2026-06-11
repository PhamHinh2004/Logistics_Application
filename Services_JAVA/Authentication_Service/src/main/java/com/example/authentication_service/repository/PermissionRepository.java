package com.example.authentication_service.repository;

import com.example.authentication_service.models.Permission;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PermissionRepository extends MongoRepository<Permission,String> {
}
