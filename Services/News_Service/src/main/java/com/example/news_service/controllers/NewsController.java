package com.example.news_service.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import com.example.news_service.util.ExternalNewsApiClient;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/v1/api")
@RequiredArgsConstructor
public class NewsController {
   private  final  ExternalNewsApiClient externalNewsApiClient;

   @GetMapping("/news")
   public Mono<ResponseEntity<?>> getNews(){
      Set<String> preferences = new HashSet<>();
      return externalNewsApiClient.fetchNews(preferences)
              .map(newsResponse -> ResponseEntity.ok(newsResponse));
   }

   @GetMapping("/news/search")
   public Mono<ResponseEntity<?>> searchNews(@RequestParam String keyword) {
      return externalNewsApiClient.searchNews(keyword)
              .map(newsResponse -> ResponseEntity.ok(newsResponse));
   }
}
