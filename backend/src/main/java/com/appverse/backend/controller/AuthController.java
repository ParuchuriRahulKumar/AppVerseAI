package com.appverse.backend.controller;

import com.appverse.backend.entity.User;
import com.appverse.backend.repository.UserRepository;
import com.appverse.backend.config.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController

@RequestMapping("/api/auth")

@CrossOrigin(origins = "http://localhost:3000")

public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // =========================
    // REGISTER USER
    // =========================

    @PostMapping("/register")

    public ResponseEntity<?> registerUser(
            @RequestBody User user
    ) {

        // CHECK DUPLICATE EMAIL

        if (
            userRepository.existsByEmail(
                user.getEmail()
            )
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                        "Email already exists"
                    );
        }

        // PASSWORD VALIDATION

        String password =
                user.getPassword();

        boolean validPassword =
                password.matches(
                    "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$"
                );

        if (!validPassword) {

            return ResponseEntity
                    .badRequest()
                    .body(
                        "Password must contain:\n" +
                        "✔ Minimum 8 characters\n" +
                        "✔ One capital letter\n" +
                        "✔ One number\n" +
                        "✔ One special character"
                    );
        }

        // DEFAULT ROLE

        if (
            user.getRole() == null ||
            user.getRole().isEmpty()
        ) {

            user.setRole("ROLE_USER");
        }

        // SAVE USER

        userRepository.save(user);

        return ResponseEntity.ok(
                "User Registered Successfully"
        );
    }

    // =========================
    // LOGIN USER
    // =========================

    @PostMapping("/login")

    public ResponseEntity<?> loginUser(
            @RequestBody User loginData
    ) {

        Optional<User> userOptional =
                userRepository.findByEmail(
                        loginData.getEmail()
                );

        // EMAIL CHECK

        if (userOptional.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(
                        "Invalid Email"
                    );
        }

        User user =
                userOptional.get();

        // PASSWORD CHECK

        if (
            !user.getPassword()
                    .equals(
                        loginData.getPassword()
                    )
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                        "Invalid Password"
                    );
        }

        // GENERATE JWT TOKEN

        String token =
                jwtUtil.generateToken(
                        user.getEmail(),
                        user.getRole()
                );

        // RESPONSE

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "token",
                token
        );

        response.put(
                "email",
                user.getEmail()
        );

        response.put(
                "role",
                user.getRole()
        );

        response.put(
                "name",
                user.getName()
        );

        return ResponseEntity.ok(
                response
        );
    }
}