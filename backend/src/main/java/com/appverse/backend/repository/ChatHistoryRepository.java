package com.appverse.backend.repository;

import com.appverse.backend.entity.ChatHistory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatHistoryRepository
        extends JpaRepository<ChatHistory, Long> {

    List<ChatHistory> findByUserEmailOrderByCreatedAtDesc(
            String userEmail
    );
}