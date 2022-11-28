package com.librarybackend.controller;

import com.librarybackend.dto.ServerResponseDTO;
import com.librarybackend.dto.UserDTO;
import com.librarybackend.exception.*;
import com.librarybackend.security.JwtRequest;
import com.librarybackend.security.JwtResponse;
import com.librarybackend.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
    private AuthService authService;

    @PostMapping("/signin")
    public ServerResponseDTO signin(@RequestBody JwtRequest requestPayload) {
        try {
            JwtResponse response = authService.signIn(requestPayload);
            return new ServerResponseDTO(HttpStatus.OK.value(), "Đăng nhập thành công!", response);
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
    public ServerResponseDTO signup(@RequestBody UserDTO userDTO) {
        try {
            UserDTO userDto = authService.signUp(userDTO);
            return new ServerResponseDTO(HttpStatus.OK.value(), "Đăng ký thành công!", userDto);
        } catch (DataIntegrityViolationException exception) {
            throw new DuplicateAccountException("Trùng tên đăng nhập!");
        } catch (Exception exception) {
            throw new UnauthorizeException("Unknow exception!");
        }
    }
}
