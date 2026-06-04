package com.appverse.backend.repository;

import com.appverse.backend.entity.App;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppRepository
        extends JpaRepository<App, Long> {

    List<App> findByAppNameContainingIgnoreCase(
            String keyword
    );
}