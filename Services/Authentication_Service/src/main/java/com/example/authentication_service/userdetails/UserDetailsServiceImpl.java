package com.example.authentication_service.userdetails;

import com.example.authentication_service.exception.AppException;
import com.example.authentication_service.exception.ErrorCode;
import com.example.authentication_service.models.Account;
import com.example.authentication_service.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        // Try to find by username first
        Account account = accountRepository.findByUsername(identifier);
        if (account == null) {
            // Fallback to email lookup (used for legacy JWT where subject is email)
            account = accountRepository.findByEmail(identifier);
        }
        if (account == null) {
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        return UserDetailsImpl.build(account);
    }

    /**
     * Load user details by internal Account ID (subject of JWT)
     */
    public UserDetails loadUserById(String accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        return UserDetailsImpl.build(account);
    }
}
