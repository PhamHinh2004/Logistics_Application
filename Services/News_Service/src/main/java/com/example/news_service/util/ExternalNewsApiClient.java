package com.example.news_service.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Set;

@Component
@Slf4j
public class ExternalNewsApiClient {


    @Value("${gnews.api.key}")
    private String apiKey;

    private final WebClient webClient;
    private final ReactiveStringRedisTemplate redisTemplate;

    public ExternalNewsApiClient(WebClient.Builder webClientBuilder, 
                                 @Value("${gnews.api.url}") String apiUrl,
                                 ReactiveStringRedisTemplate redisTemplate) {
        this.webClient = webClientBuilder.baseUrl(apiUrl).build();
        this.redisTemplate = redisTemplate;
    }
    public Mono<String> fetchNews(Set<String> preferences) {
        String query = "logistics+container"; 
        String cacheKey = "news:fetchNews:default";

        return redisTemplate.opsForValue().get(cacheKey)
                .switchIfEmpty(
                        webClient.get()
                                .uri(uriBuilder -> uriBuilder
                                        .path("/search") // Dùng search thay vì top-headlines để có thể gửi param q
                                        .queryParam("q", query)
                                        .queryParam("lang","vi")
                                        .queryParam("max","20")
                                        .queryParam("country","vn")
                                        .queryParam("apikey", apiKey)
                                        .build())
                                .retrieve()
                                .bodyToMono(String.class)
                                .flatMap(data -> {
                                    if(data != null && !data.contains("\"error\"")) {
                                        return redisTemplate.opsForValue().set(cacheKey, data, Duration.ofHours(24))
                                                .thenReturn(data);
                                    }
                                    return Mono.just(data);
                                })
                                .onErrorResume(org.springframework.web.reactive.function.client.WebClientResponseException.class,
                                        e -> Mono.just(e.getResponseBodyAsString()))
                                .onErrorResume(e -> Mono.just("{\"error\": \"" + e.getMessage() + "\"}"))
                );
    }

    public Mono<String> searchNews(String keyword){
        if(keyword == null || keyword.isEmpty()){
            return Mono.just("{}");
        }
        String cacheKey = "news:search:" + keyword;
        return redisTemplate.opsForValue().get(cacheKey)
                .switchIfEmpty(
                        webClient.get()
                                .uri(uriBuilder -> uriBuilder
                                        .path("/search")
                                        .queryParam("q", keyword)
                                        .queryParam("apikey", apiKey)
                                        .queryParam("lang", "vi")
                                        .queryParam("max", "10")
                                        .queryParam("country","vn")
                                        .build())
                                .retrieve()
                                .bodyToMono(String.class)
                                .flatMap(data -> {
                                    if(data != null && !data.contains("\"error\"")) {
                                        return redisTemplate.opsForValue().set(cacheKey, data, Duration.ofHours(24))
                                                .thenReturn(data);
                                    }
                                    return Mono.just(data);
                                })
                                .onErrorResume(e -> Mono.just("{\"error\": \"" + e.getMessage() + "\"}"))
                );
    }
}
