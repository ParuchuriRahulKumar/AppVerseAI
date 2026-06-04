package com.appverse.backend.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class GeminiService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    public String askAI(String question) {

        try {

            String url = "https://openrouter.ai/api/v1/chat/completions";

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_JSON);

            headers.setBearerAuth(apiKey);

            JSONObject body = new JSONObject();

            body.put("model", "deepseek/deepseek-chat-v3");

            JSONArray messages = new JSONArray();

            JSONObject userMessage = new JSONObject();

            userMessage.put("role", "user");

            userMessage.put("content", question);

            messages.put(userMessage);

            body.put("messages", messages);

            HttpEntity<String> request =
                    new HttpEntity<>(body.toString(), headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(url, request, String.class);

            JSONObject jsonResponse =
                    new JSONObject(response.getBody());

            JSONArray choices =
                    jsonResponse.getJSONArray("choices");

            JSONObject firstChoice =
                    choices.getJSONObject(0);

            JSONObject message =
                    firstChoice.getJSONObject("message");

            return message.getString("content");

        } catch (Exception e) {

            e.printStackTrace();

            return "Error while calling AI";
        }
    }
}