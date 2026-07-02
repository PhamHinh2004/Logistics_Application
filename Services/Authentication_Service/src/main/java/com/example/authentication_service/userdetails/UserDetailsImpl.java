package com.example.authentication_service.userdetails;

import com.example.authentication_service.models.Account;
import com.example.authentication_service.models.StatusAccount;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Data
@Builder
public class UserDetailsImpl implements UserDetails {
    @Serial
    private static final long serialVersionUID = 1L;

    private String id;

    private String username;

    private String email;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    private boolean isActive;
    private String phone;
    private StatusAccount statusAccount;
    private boolean createCustomer;

    public static UserDetailsImpl build(Account account) {
        List<SimpleGrantedAuthority> authorities = account.getRole() != null ?
                List.of(new SimpleGrantedAuthority(account.getRole().getName())) :
                List.of(new SimpleGrantedAuthority("ROLE_USER"));

        return UserDetailsImpl.builder()
                .id(account.getId())
                .username(account.getUsername())
                .email(account.getEmail())
                .password(account.getPassword())
                .authorities(authorities)
                .isActive(account.isActive())
                .phone(account.getPhone())
                .statusAccount(account.getStatusAccount())
                .createCustomer(account.isCreateCustomer())
                .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    public boolean getCreateCustomer(){
        return this.createCustomer;
    }

}
