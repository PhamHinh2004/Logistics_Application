package com.example.authentication_service.service;

import io.rebloom.client.Client;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RedisBloomFilterService {
    private static final String USERNAME_FILTER = "bloom:username";
    private static final String EMAIL_FILTER    = "bloom:email";

    // Error rate 1%, capacity 2 triệu — chỉ tạo 1 lần khi filter chưa tồn tại
    private static final double ERROR_RATE = 0.01;
    private static final long   CAPACITY   = 2_000_000;

   private final Client bloomClient;
    @PostConstruct
    public void init() {

        try {
            bloomClient.createFilter(USERNAME_FILTER, CAPACITY, ERROR_RATE);
        } catch (Exception ignored) {}

        try {
            bloomClient.createFilter(EMAIL_FILTER, CAPACITY, ERROR_RATE);
        } catch (Exception ignored) {}
    }

    public boolean mightExistUsername(String username) {
        return bloomClient.exists(USERNAME_FILTER, username.toLowerCase());
    }

    public boolean mightExistEmail(String email) {
        return bloomClient.exists(EMAIL_FILTER, email.toLowerCase());
    }

    public void addUsername(String username) {
        bloomClient.add(USERNAME_FILTER, username.toLowerCase());
    }

    public void addEmail(String email) {
        bloomClient.add(EMAIL_FILTER, email.toLowerCase());
    }

    public void addAllUsernames(List<String> list) {
        String[] arr = list.stream().map(String::toLowerCase).toArray(String[]::new);
        bloomClient.addMulti(USERNAME_FILTER, arr);
    }


    public void addAllEmails(List<String> list) {
        String[] arr = list.stream().map(String::toLowerCase).toArray(String[]::new);
        bloomClient.addMulti(EMAIL_FILTER, arr);
    }
}
