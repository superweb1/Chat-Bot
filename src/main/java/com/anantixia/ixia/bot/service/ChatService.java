package com.anantixia.ixia.bot.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatService {

    private final Map<String, String> knowledgeBase = new HashMap<>();

    public ChatService() {
        knowledgeBase.put("hello", "Hi Sudu Bhai! 👋 How can I help you?");
        knowledgeBase.put("job", "We have openings for Java Backend Developers.");
        knowledgeBase.put("spring", "Spring Boot is used to build production-ready Java applications.");
        knowledgeBase.put("java", "Java is an object-oriented programming language used for backend development.");
        knowledgeBase.put("project", "You can build chatbot, e-commerce, or microservices projects.");
        knowledgeBase.put("mysql", "MySQL is a relational database used to store data.");
        knowledgeBase.put("jwt", "JWT is used for authentication and authorization.");
        knowledgeBase.put("microservices", "Microservices architecture divides apps into small services.");
    }

    public String getReply(String message) {

        message = message.toLowerCase();

        for (String key : knowledgeBase.keySet()) {
            if (message.contains(key)) {
                return knowledgeBase.get(key);
            }
        }

        if (message.contains("how") && message.contains("learn")) {
            return "Start with Java basics, then Spring Boot, then build projects.";
        }

        if (message.contains("resume")) {
            return "Highlight your projects, skills, and internship experience.";
        }

        if (message.contains("interview")) {
            return "Practice DSA, Spring Boot, and real project questions.";
        }

        return "Sorry, I didn’t understand that. Try asking about Java, jobs, or projects.";
    }
}