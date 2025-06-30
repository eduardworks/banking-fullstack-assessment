package com.example.bankingapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final String MOCK_USERNAME = "user";
    private final String MOCK_PASSWORD = "password";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
    System.out.println("Received login attempt - username: " + username + ", password: " + password);
        if (MOCK_USERNAME.equals(username) && MOCK_PASSWORD.equals(password)) {
           
            return ResponseEntity.ok(Map.of("token", "mock-token-123"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        }
    }
}
