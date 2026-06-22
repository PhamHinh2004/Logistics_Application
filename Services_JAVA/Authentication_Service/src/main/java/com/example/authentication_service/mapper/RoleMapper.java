package com.example.authentication_service.mapper;

import com.example.authentication_service.models.Role;
import com.example.authentication_service.models.dto.response.RoleResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    RoleResponse toRoleResponse(Role role);
}
