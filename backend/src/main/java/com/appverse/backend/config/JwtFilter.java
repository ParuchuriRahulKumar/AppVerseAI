package com.appverse.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(

            HttpServletRequest request,

            HttpServletResponse response,

            FilterChain filterChain

    ) throws ServletException, IOException {

        // GET REQUEST PATH

        String path =
                request.getServletPath();

        // PUBLIC APIs

        if (

                path.startsWith("/api/auth") ||

                path.startsWith("/api/apps") ||

                path.startsWith("/api/chat") ||

                path.startsWith("/api/reviews")

        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        // GET AUTH HEADER

        final String authHeader =
                request.getHeader("Authorization");

        String token = null;

        String email = null;

        String role = null;

        // CHECK HEADER

        if (

                authHeader != null &&

                authHeader.startsWith("Bearer ")

        ) {

            token =
                    authHeader.substring(7);

            email =
                    jwtUtil.extractEmail(token);

            role =
                    jwtUtil.extractRole(token);
        }

        // VALID TOKEN

        if (

                email != null &&

                SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null

        ) {

            if (
                    jwtUtil.validateToken(token)
            ) {

                UsernamePasswordAuthenticationToken authToken =

                        new UsernamePasswordAuthenticationToken(

                                email,

                                null,

                                List.of(
                                        new SimpleGrantedAuthority(role)
                                )
                        );

                authToken.setDetails(

                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authToken);
            }
        }

        // CONTINUE FILTER

        filterChain.doFilter(
                request,
                response
        );
    }
}