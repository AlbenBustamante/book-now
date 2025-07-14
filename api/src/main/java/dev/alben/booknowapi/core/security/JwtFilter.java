package dev.alben.booknowapi.core.security;

import dev.alben.booknowapi.core.exception.UnauthorizedException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final var header = request.getHeader("Authorization");
        final var prefix = "Bearer ";

        if (header == null || header.isBlank() || header.startsWith(prefix)) {
            throw new UnauthorizedException("Please, log in to continue navigating");
        }

        final var token = header.split(prefix)[1];
        final var username = jwtProvider.validateToken(token);
        final var user = customUserDetailsService.loadUserByUsername(username);

        final var authToken = new UsernamePasswordAuthenticationToken(user, user.getPassword(), user.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
