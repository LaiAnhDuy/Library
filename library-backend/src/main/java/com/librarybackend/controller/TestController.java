package com.librarybackend.controller;

import com.librarybackend.dto.ServerResponse;
import com.librarybackend.entity.UserEntity;
import com.librarybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/signin")
    public ServerResponse signIn() {
        UserEntity userEntity = userRepository.findByUsername("duongnv");

        return new ServerResponse(1, "Thanh cong", userEntity);
    }
}
