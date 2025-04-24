package com.redwire.maxt4674.api_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  
                .allowedOrigins("http://54.252.132.194")  
                .allowedMethods("GET", "POST", "PUT", "DELETE")  
                .allowCredentials(true)  
                .allowedHeaders("*");  
    }
}