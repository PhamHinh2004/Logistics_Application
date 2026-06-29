package com.example.authentication_service.models.dto.response;

import com.example.authentication_service.models.RoleOptions;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleResponse {
    private String id;
    private String name;
    private RoleOptions roleOptions;
    private String description;
}
