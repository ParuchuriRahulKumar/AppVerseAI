package com.appverse.backend.config;

import io.jsonwebtoken.Claims;

import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY =
            "mysecretkeymysecretkeymysecretkey12345";

    private final Key key =
            Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes()
            );

    // GENERATE TOKEN

    public String generateToken(
            String email,
            String role
    ) {

        return Jwts.builder()

                .setSubject(email)

                .claim("role", role)

                .setIssuedAt(
                        new Date()
                )

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60 * 10
                        )
                )

                .signWith(
                        key,
                        SignatureAlgorithm.HS256
                )

                .compact();
    }

    // EXTRACT EMAIL

    public String extractEmail(
            String token
    ) {

        return extractClaims(token)
                .getSubject();
    }

    // EXTRACT ROLE

    public String extractRole(
            String token
    ) {

        return extractClaims(token)
                .get("role", String.class);
    }

    // VALIDATE TOKEN

    public boolean validateToken(
            String token
    ) {

        try {

            extractClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }

    // EXTRACT CLAIMS

    private Claims extractClaims(
            String token
    ) {

        return Jwts.parserBuilder()

                .setSigningKey(key)

                .build()

                .parseClaimsJws(token)

                .getBody();
    }
}