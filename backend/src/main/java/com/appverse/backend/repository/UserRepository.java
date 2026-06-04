package com.appverse.backend.repository;

import com.appverse.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(
            String email
    );

    // CHECK DUPLICATE EMAIL

    boolean existsByEmail(
            String email
    );
}