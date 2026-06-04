package com.appverse.backend.controller;

import com.appverse.backend.repository.AppRepository;
import com.appverse.backend.repository.ReviewRepository;
import com.appverse.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppRepository appRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/stats")
    public Map<String, Long> getStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("students", userRepository.count());

        stats.put("apps", appRepository.count());

        stats.put("reviews", reviewRepository.count());

        return stats;
    }
}