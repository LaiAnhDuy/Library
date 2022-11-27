package com.librarybackend.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

    private static final long serialVersionUID = -7858869558953243875L;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        throw authException;
//        Map<String, String> error  = new HashMap<>();
//        if(authException instanceof BadCredentialsException) {
//            error.put("message" , "Wrong username or password");
//            throw new WrongUsernamPasswordException("Sai mat khau");
//        } else if(authException instanceof InsufficientAuthenticationException) {
//            error.put("message", "Unauthorize");
//        }
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//        System.out.println(authException);
//        System.out.println(authException.getMessage());
//        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }
}

