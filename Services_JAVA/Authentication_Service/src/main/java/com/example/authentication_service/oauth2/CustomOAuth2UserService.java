package com.example.authentication_service.oauth2;

import com.example.authentication_service.components.RoleFactory;
import com.example.authentication_service.exception.AppException;
import com.example.authentication_service.exception.ErrorCode;
import com.example.authentication_service.models.Account;
import com.example.authentication_service.models.StatusAccount;
import com.example.authentication_service.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final AccountRepository accountRepository;
    private final RoleFactory roleFactory;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerId = oAuth2User.getName();
        
        // Tạo bản sao có thể chỉnh sửa của attributes
        java.util.Map<String, Object> attributes = new java.util.HashMap<>(oAuth2User.getAttributes());
        
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String login = (String) attributes.get("login");

        // Xử lý lỗi Email bị ẩn (null) trên GitHub
        if (email == null || email.isEmpty()) {
            if (login != null) {
                email = login + "@github.com";
            } else {
                email = providerId + "@" + provider + ".com";
            }
            attributes.put("email", email); // Lưu email giả định vào attributes để Handler sử dụng
        }

        if (name == null || name.isEmpty()) {
            name = (login != null) ? login : email.split("@")[0];
            attributes.put("name", name);
        }

        // Lấy tên thuộc tính định danh động từ cấu hình của Provider (thay vì cố định "email")
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        Account account = accountRepository.findByEmail(email);
        if (account != null) {
            // User already exists, update provider info if needed
            if (account.getProvider() == null) {
                account.setProvider(provider);
                account.setProviderId(providerId);
                accountRepository.save(account);
            }
            return new DefaultOAuth2User(
                    List.of(new SimpleGrantedAuthority(account.getRole() != null ? account.getRole().getName() : "ROLE_USER")),
                    attributes,
                    userNameAttributeName
            );
        } else {
            // User does not exist, create a new account
            accountRepository.save(
                    Account.builder()
                            .email(email)
                            .provider(provider)
                            .providerId(providerId)
                            .username(name)
                            .isActive(true)
                            .statusAccount(StatusAccount.Active)
                            .role(roleFactory.getInstance("user")) // Set default role
                            .build()
            );

            return new DefaultOAuth2User(
                    List.of(new SimpleGrantedAuthority("ROLE_USER")),
                    attributes,
                    userNameAttributeName
            );
        }
    }
}
