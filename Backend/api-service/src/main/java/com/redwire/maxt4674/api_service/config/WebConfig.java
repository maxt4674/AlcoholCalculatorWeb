package com.redwire.maxt4674.api_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Enable CORS for all endpoints under /api/*
                .allowedOrigins("http://54.252.132.194")  // Allow frontend to make requests
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow these methods
                .allowCredentials(true)  // Allow cookies to be sent
                .allowedHeaders("*");  // Allow any header
    }
}