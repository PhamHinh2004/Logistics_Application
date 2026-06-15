package com.example.authentication_service.service;

import com.example.authentication_service.exception.AppException;
import com.example.authentication_service.exception.ErrorCode;
import com.example.authentication_service.mapper.RoleMapper;
import com.example.authentication_service.models.Role;
import com.example.authentication_service.models.dto.response.RoleResponse;
import com.example.authentication_service.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;


    public List<RoleResponse> findAll(){
        List<Role> roles = roleRepository.findAll();
        List<RoleResponse> roleResponses = new ArrayList<>();
        for (Role role : roles) {
            RoleResponse roleResponse = roleMapper.toRoleResponse(role);
            roleResponses.add(roleResponse);
        }
        if(roleResponses.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        return roleResponses;
    }


}
