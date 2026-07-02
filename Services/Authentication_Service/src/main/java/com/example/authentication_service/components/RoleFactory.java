package com.example.authentication_service.components;

import com.example.authentication_service.models.Role;
import com.example.authentication_service.models.RoleOptions;
import com.example.authentication_service.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class RoleFactory {
    @Autowired
    RoleRepository roleRepository;

    public Role getInstance(String role){
        switch (role){
            case "admin" ->{
                return roleRepository.findByName(RoleOptions.ROLE_ADMIN);
            }
            case "user" ->{
                return roleRepository.findByName(RoleOptions.ROLE_USER);
            }
            case "staff" ->{
                return roleRepository.findByName(RoleOptions.ROLE_STAFF);
            }
        }
        return roleRepository.findByName(RoleOptions.ROLE_USER);
    }

    public Set<Role> determineRoles(Set<String> roles){
        Set<Role> roleSet = new HashSet<>();
        if(roles == null){
            roleSet.add(this.getInstance("user"));
        }else{
            for(String role : roles){
                roleSet.add(this.getInstance(role));
            }
        }
        return roleSet;
    }
}
