package com.sttapp.service;

import com.sttapp.dto.AuthResponse;
import com.sttapp.dto.LoginRequest;
import com.sttapp.dto.RegisterRequest;

import com.sttapp.model.User;
import com.sttapp.repository.UserRepository;
import com.sttapp.security.JwtUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(
                request.getEmail()
        ).orElseThrow(
                () -> new RuntimeException("User not found")
        );

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches) {
            throw new RuntimeException("Invalid credentials");
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail()
                );

        return new AuthResponse(token);
    }
}