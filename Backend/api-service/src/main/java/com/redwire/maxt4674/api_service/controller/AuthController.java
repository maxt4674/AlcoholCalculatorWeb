package com.redwire.maxt4674.api_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.redwire.maxt4674.api_service.dto.LoginRequest;
import com.redwire.maxt4674.api_service.dto.LoginResponse;
import com.redwire.maxt4674.api_service.dto.RegisterRequest;
import com.redwire.maxt4674.api_service.exception.UserAlreadyExistsException;
import com.redwire.maxt4674.api_service.exception.UserNotFoundException;
import com.redwire.maxt4674.api_service.security.JwtUtil;
import com.redwire.maxt4674.api_service.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserService userService;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        try {
            return ResponseEntity.ok(userService.register(req));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            var user = userService.authenticate(req.username(), req.password());
            var token = jwtUtil.generateToken(user.getUsername(), user.getEmail() ,user.getUserType().name());
            return ResponseEntity.ok(new LoginResponse(
                    token, user.getUsername(), user.getEmail(), user.getUserType().name()
            ));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}
