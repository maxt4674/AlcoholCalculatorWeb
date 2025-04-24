package com.redwire.maxt4674.api_service.dto;

import com.redwire.maxt4674.api_service.model.User.Role;

public record RegisterRequest(String username, String email, String password, Role userType) {}