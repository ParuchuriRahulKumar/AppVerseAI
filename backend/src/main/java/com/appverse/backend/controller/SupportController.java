package com.appverse.backend.controller;

import com.appverse.backend.entity.SupportMessage;
import com.appverse.backend.repository.SupportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "http://localhost:3000")
public class SupportController {

    @Autowired
    private SupportRepository supportRepository;

    // GET UNSOLVED MESSAGES
    @GetMapping
    public List<SupportMessage> getAllMessages() {

        return supportRepository.findBySolvedFalse();
    }

    // GET SOLVED MESSAGES
    @GetMapping("/solved")
    public List<SupportMessage> getSolvedMessages() {

        return supportRepository.findBySolvedTrue();
    }

    // SAVE SUPPORT MESSAGE
    @PostMapping
    public SupportMessage saveMessage(
            @RequestBody SupportMessage message) {

        return supportRepository.save(message);
    }

    // MARK AS SOLVED
    @PutMapping("/solve/{id}")
    public SupportMessage markAsSolved(
            @PathVariable Long id) {

        SupportMessage msg =
                supportRepository.findById(id).orElseThrow();

        msg.setSolved(true);

        return supportRepository.save(msg);
    }

    // DELETE MESSAGE
    @DeleteMapping("/{id}")
    public void deleteMessage(
            @PathVariable Long id) {

        supportRepository.deleteById(id);
    }
}