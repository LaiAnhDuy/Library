package com.librarybackend.security;

import com.librarybackend.exception.InvalidTokenException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil implements Serializable {

    private static final long serialVersionUID = -2550185165626007488L;
    public static final long EXPIRED_TIME = 5 * 6 * 60;

    @Value("secret_key")
    private String secretKey;

    public String getTokenFromHeader(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        return authorizationHeader.substring(7);
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public Date getExpirationDateFromToken(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getExpiration();
    }

    private boolean isTokenExpired(String token) {
        return getExpirationDateFromToken(token).before(new Date());
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRED_TIME * 1000))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }

    public void validateToken(String token, UserDetails userDetails) {
        String username = getUsernameFromToken(token);
        boolean isTokenValid = username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
        if(isTokenValid) {
            return;
        } else {
            throw new InvalidTokenException("Token không hợp lệ!");
        }
    }
}