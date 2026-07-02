package com.example.authentication_service.service;

import com.example.authentication_service.exception.AppException;
import com.example.authentication_service.exception.ErrorCode;
import com.example.authentication_service.models.RefreshToken;
import com.example.authentication_service.repository.AccountRepository;
import com.example.authentication_service.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    @Value("${app.jwtRefreshExpirationMs:604800000}") // Mặc định là 7 ngày nếu không cấu hình
    private Long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;
    private final AccountRepository accountRepository;

    public RefreshToken createRefreshToken(String accountId) {
        // Xóa refresh token cũ của account này trước khi tạo cái mới
        refreshTokenRepository.deleteByAccount_Id(accountId);

        RefreshToken refreshToken = RefreshToken.builder()
                .account(accountRepository.findById(accountId)
                        .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND)))
                .expiryDate(Instant.now().plusMillis(refreshTokenDurationMs))
                .token(UUID.randomUUID().toString())
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new AppException(ErrorCode.REFRESH_TOKEN_EXPIRED);
        }
        return token;
    }

    @Transactional
    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
}
