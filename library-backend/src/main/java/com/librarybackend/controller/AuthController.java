package com.librarybackend.controller;

import com.librarybackend.dto.ServerResponse;
import com.librarybackend.exception.DisableAccountException;
import com.librarybackend.exception.UnauthorizeException;
import com.librarybackend.exception.UnknowException;
import com.librarybackend.exception.WrongUsernamPasswordException;
import com.librarybackend.security.JwtRequest;
import com.librarybackend.security.JwtResponse;
import com.librarybackend.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
@Slf4j
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ServerResponse signin(@RequestBody JwtRequest requestPayload) {
        try {
            JwtResponse response = authService.signIn(requestPayload);
            return new ServerResponse(HttpStatus.OK.value(), "Login successfully!", response);
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            throw new WrongUsernamPasswordException("Sai tên đăng nhập hoặc mật khẩu");
        }
    }
}
