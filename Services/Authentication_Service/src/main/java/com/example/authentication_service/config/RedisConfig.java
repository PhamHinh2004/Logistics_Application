package com.example.authentication_service.config;

import io.lettuce.core.RedisURI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;

@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.url}")
    private String redisUri;

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        RedisURI uri = RedisURI.create(redisUri);

        // Config host + port + password
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
        config.setHostName(uri.getHost());
        config.setPort(uri.getPort());
        config.setPassword(String.valueOf(uri.getPassword())); // ← thêm password

        // Config SSL — Upstash bắt buộc
        LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
                .useSsl()                    // ← bật SSL
                .disablePeerVerification()   // ← không verify cert
                .build();

        return new LettuceConnectionFactory(config, clientConfig);
    }
}