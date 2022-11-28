package com.librarybackend.service;

import com.librarybackend.dto.UserDTO;
import com.librarybackend.entity.UserEntity;
import com.librarybackend.security.JwtRequest;
import com.librarybackend.security.JwtResponse;
import com.librarybackend.security.JwtUtil;
import com.librarybackend.security.LibraryUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    public JwtResponse signIn(JwtRequest requestPayload) {
        UsernamePasswordAuthenticationToken
                authenticationObject = new UsernamePasswordAuthenticationToken(requestPayload.getUsername(), requestPayload.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationObject);
        LibraryUserDetails userDetails = (LibraryUserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);
        return new JwtResponse(userDetails.getUserEntity().getCode(), userDetails.getUsername(), "user", token);
    }

    public UserDTO signUp(UserDTO userDTO) {
        UserEntity userToSave = new UserEntity(userDTO);
        userService.save(userToSave);
        userDTO = new UserDTO(userToSave);
        return userDTO;
    }
}
