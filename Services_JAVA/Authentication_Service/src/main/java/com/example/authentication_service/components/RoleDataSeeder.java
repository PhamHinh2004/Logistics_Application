package com.example.authentication_service.components;

import com.example.authentication_service.models.Role;
import com.example.authentication_service.models.RoleOptions;
import com.example.authentication_service.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class RoleDataSeeder {
    @Autowired
    private RoleRepository roleRepository;


    @EventListener
    @Transactional
    public void LoadRoles(ContextRefreshedEvent event) {
        List<RoleOptions> roleOptions = Arrays.stream(RoleOptions.values()).toList();
        for (RoleOptions item : roleOptions) {
            if(roleRepository.findByName(item)==null){
                roleRepository.save(
                        Role
                                .builder()
                                .name(item.name())
                                .roleOptions(item)
                                .description(""+item.name())
                                .permissions(null)
                                .build()
                );
            }
        }
    }
}
