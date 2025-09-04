package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin(origins = "*")
public class ExamController {

    private final QuestionRepository repo;

    public ExamController(QuestionRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question q) {
        return repo.save(q);
    }

    @GetMapping("/questions")
    public List<Question> getQuestions() {
        return repo.findAll();
    }

    @PostMapping("/submit")
    public Map<String,Object> submit(@RequestBody Map<Integer,String> answers) {
        int score = 0;
        for (Question q : repo.findAll()) {
            if (answers.containsKey(q.getId()) && q.getAnswer().equals(answers.get(q.getId()))) score++;
        }
        Map<String,Object> result = new HashMap<>();
        result.put("score", score);
        result.put("total", repo.findAll().size());
        return result;
    }
}

