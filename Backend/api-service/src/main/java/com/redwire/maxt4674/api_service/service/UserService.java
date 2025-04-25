package com.redwire.maxt4674.api_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.redwire.maxt4674.api_service.dto.RegisterRequest;
import com.redwire.maxt4674.api_service.model.User;
import com.redwire.maxt4674.api_service.repository.UserRepository;
import com.redwire.maxt4674.api_service.exception.UserAlreadyExistsException;
import com.redwire.maxt4674.api_service.exception.UserNotFoundException;

@Service
public class UserService {

    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {
        if (userRepo.existsByUsername(request.username())) {
            throw new UserAlreadyExistsException("Username is already taken.");
        }

        if (userRepo.existsByEmail(request.email())) {
            throw new UserAlreadyExistsException("Email is already taken.");
        }

        var user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password())); 
        user.setUserType(request.userType()); 
        
        return userRepo.save(user);
    }

    public User authenticate(String username, String rawPassword) {
        var user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
        
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }
}
