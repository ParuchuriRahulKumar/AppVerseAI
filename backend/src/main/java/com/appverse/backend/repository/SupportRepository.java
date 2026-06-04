package com.appverse.backend.repository;

import com.appverse.backend.entity.SupportMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupportRepository
        extends JpaRepository<SupportMessage, Long> {

    List<SupportMessage> findBySolvedFalse();

    List<SupportMessage> findBySolvedTrue();
}