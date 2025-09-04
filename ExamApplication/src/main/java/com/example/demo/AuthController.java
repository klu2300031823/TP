package com.example.demo;


//import org.springframework.web.bind.annotation.*;
//import java.util.*;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins="*")
//public class AuthController {
//
//    private final UserRepository repo;
//
//    public AuthController(UserRepository repo) { this.repo = repo; }
//
//    @PostMapping("/register")
//    public Map<String,String> register(@RequestBody User u) {
//        if(repo.findByUsername(u.getUsername()).isPresent()){
//            return Map.of("message","Username already exists");
//        }
//        repo.save(u); // password stored plain for simplicity
//        return Map.of("message","Registered successfully");
//    }
//
//    @PostMapping("/login")
//    public Map<String,String> login(@RequestBody User u) {
//        Optional<User> user = repo.findByUsername(u.getUsername());
//        if(user.isPresent() && user.get().getPassword().equals(u.getPassword())){
//            String token = JwtUtil.generateToken(u.getUsername(), user.get().getRole());
//            return Map.of("token",token, "role", user.get().getRole());
//        }
//        return Map.of("message","Invalid credentials");
//    }
//}



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User u){
        String username = u.getUsername().trim().toLowerCase();

        if(repo.findByUsername(username).isPresent()){
            return ResponseEntity.status(409).body(Map.of("message","Username already exists"));
        }

        u.setUsername(username);
        u.setPassword(encoder.encode(u.getPassword().trim()));
        if(u.getRole()==null || u.getRole().isEmpty()) u.setRole("USER");
        repo.save(u);

        return ResponseEntity.ok(Map.of("message","Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody User u){
        String username = u.getUsername().trim().toLowerCase();
        String password = u.getPassword();

        Optional<User> userOpt = repo.findByUsername(username);
        if(userOpt.isEmpty()){
            System.out.println("User not found: " + username);
            return ResponseEntity.status(404).body(Map.of("message","User not found"));
        }

        User user = userOpt.get();
        boolean match = encoder.matches(password, user.getPassword());
        System.out.println("Login attempt: " + username + ", password matches? " + match);

        if(!match){
            return ResponseEntity.status(401).body(Map.of("message","Invalid credentials"));
        }

        String token = JwtUtil.generateToken(user.getUsername(), user.getRole());

        return ResponseEntity.ok(Map.of("token", token, "role", user.getRole()));
    }
}
