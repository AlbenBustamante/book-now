package dev.alben.booknowapi.core.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import dev.alben.booknowapi.core.exception.UnauthorizedException;
import dev.alben.booknowapi.module.user.domain.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * Provider for JWTs.
 */
@Component
public class JwtProvider {
    @Value("${jwt.secret-key}")
    private String secretKey;

    public String generateToken(User user) {
        return JWT.create()
                .withClaim("id", user.id())
                .withClaim("role", user.role().toString())
                .withSubject(user.email())
                .withIssuedAt(Instant.now())
                .withExpiresAt(Instant.now().plus(7, TimeUnit.DAYS.toChronoUnit()))
                .sign(Algorithm.HMAC384(secretKey));
    }

    public String extractUsername(String token) {
        return validateToken(token).getSubject();
    }

    public Integer extractId(String token) {
        return validateToken(token).getClaim("id").asInt();
    }

    private DecodedJWT validateToken(String token) {
        try {
            final var decoded = JWT.require(Algorithm.HMAC384(secretKey)).build().verify(token);
            final var expiresAt = decoded.getExpiresAt();

            if (expiresAt.after(new Date())) {
                throw new UnauthorizedException("Please, log in again");
            }

            return decoded;
        } catch (JWTVerificationException e) {
            throw new UnauthorizedException(e.getMessage());
        }
    }
}
