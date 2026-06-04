package com.appverse.backend.controller;

import com.appverse.backend.entity.Review;
import com.appverse.backend.repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping
    public Review addReview(
            @RequestBody Review review
    ) {

        return reviewRepository.save(review);
    }

    @GetMapping("/{appId}")
    public List<Review> getReviews(
            @PathVariable Long appId
    ) {

        return reviewRepository.findByAppId(appId);
    }
}