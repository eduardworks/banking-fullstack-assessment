package com.example.bankingapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()     // Allow OPTIONS for CORS preflight
                .requestMatchers("/api/auth/**").permitAll()               // Allow unauthenticated login endpoints
                .requestMatchers("/api/transactions").permitAll()          // Allow anonymous access here
                .requestMatchers(HttpMethod.GET, "/api/transactions").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/transactions").permitAll()
                .requestMatchers("/api/transactions/**").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
