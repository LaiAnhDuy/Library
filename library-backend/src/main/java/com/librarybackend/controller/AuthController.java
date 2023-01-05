package com.librarybackend.controller;

import com.librarybackend.dto.ServerResponse;
import com.librarybackend.dto.UserDTO;
import com.librarybackend.exception.*;
import com.librarybackend.security.JwtRequest;
import com.librarybackend.security.JwtResponse;
import com.librarybackend.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
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
    private AuthService authService;

    @PostMapping("/signin")
    public ServerResponse signin(@RequestBody JwtRequest requestPayload) {
        try {
            JwtResponse response = authService.signIn(requestPayload);
            return ServerResponse.success("Đăng nhập thành công!", response);
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            throw new WrongUsernamPasswordException("Sai tên đăng nhập hoặc mật khẩu");
        } catch (InsufficientAuthenticationException e) {
            throw new UnauthorizeException("Không có quyền truy cập!");
        } catch (DisabledException exception) {
            throw new DisableAccountException("Tài khoản chưa kích hoạt");
        } catch (Exception e) {
            log.error("Error login!");
            throw new UnknowException("Unknow exception!");
        }
    }

    @PostMapping("/signup")
    public ServerResponse signup(@RequestBody UserDTO userDTO) {
        try {
            UserDTO userDto = authService.signUp(userDTO);
            return ServerResponse.success("Đăng ký thành công!",userDto);
        } catch (DataIntegrityViolationException exception) {
            throw new DuplicateAccountException("Trùng tên đăng nhập!");
        } catch (Exception exception) {
            throw new UnauthorizeException("Unknow exception!");
        }
    }
}
