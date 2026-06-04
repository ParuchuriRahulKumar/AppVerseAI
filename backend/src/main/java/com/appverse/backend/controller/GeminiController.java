package com.appverse.backend.controller;

import com.appverse.backend.entity.ChatHistory;
import com.appverse.backend.repository.ChatHistoryRepository;
import com.appverse.backend.service.GeminiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/gemini")
@CrossOrigin("*")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    // ASK AI

    @PostMapping("/ask")
    public String askQuestion(
            @RequestParam String email,
            @RequestBody String question
    ) {

        String answer =
                geminiService.askAI(question);

        // SAVE CHAT

        ChatHistory chat =
                new ChatHistory();

        chat.setQuestion(question);

        chat.setAnswer(answer);

        chat.setUserEmail(email);

        chat.setCreatedAt(
                LocalDateTime.now()
        );

        chatHistoryRepository.save(chat);

        return answer;
    }

    // GET CHAT HISTORY

    @GetMapping("/history/{email}")
    public List<ChatHistory> getHistory(
            @PathVariable String email
    ) {

        return chatHistoryRepository
                .findByUserEmailOrderByCreatedAtDesc(
                        email
                );
    }
}