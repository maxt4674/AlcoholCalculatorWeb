package com.redwire.maxt4674.api_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.redwire.maxt4674.api_service.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
