package com.example.authentication_service.oauth2;

import com.example.authentication_service.exception.AppException;
import com.example.authentication_service.exception.ErrorCode;
import com.example.authentication_service.jwt.JwtUtils;
import com.example.authentication_service.models.Account;
import com.example.authentication_service.repository.AccountRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import com.example.authentication_service.models.RefreshToken;
import com.example.authentication_service.service.RefreshTokenService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtUtils jwtUtils;
    private final AccountRepository accountRepository;
    private final RefreshTokenService refreshTokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        String email = ((OAuth2User) authentication.getPrincipal()).getAttribute("email");

        Account account = accountRepository.findByEmail(email);
        if (account == null) {
            throw new AppException(ErrorCode.NOT_FOUND);
        }

        // Generate JWT where subject is the internal Account ID
        String jwt = jwtUtils.generateJwtTokenFromId(account.getId());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(account.getId());
        boolean createdCustomer = account.isCreateCustomer();
        String id = account.getId();
        // Option A: Redirect về frontend kèm token và refreshToken (SPA)
        String redirectUrl = "http://localhost:5173/oauth2/redirect?token=" + jwt + "&refreshToken=" + refreshToken.getToken() + "&createdCustomer=" + createdCustomer +"&id=" + id;
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);

    }
}
