package dev.alben.booknowapi.core.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import dev.alben.booknowapi.core.exception.UnauthorizedException;
import dev.alben.booknowapi.module.user.domain.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;

/**
 * Provider for JWTs.
 */
@Component
public class JwtProvider {
    private static final long SECONDS = 10 * 60 * 60;

    @Value("${jwt.secret-key}")
    private String secretKey;

    public String generateToken(User user) {
        return JWT.create()
                .withClaim("id", user.id())
                .withClaim("role", user.role().role().toString())
                .withSubject(user.email())
                .withIssuedAt(Instant.now())
                .withExpiresAt(Instant.now().plusSeconds(SECONDS))
                .sign(Algorithm.HMAC384(secretKey));
    }

    public String validateToken(String token) {
        try {
            final var decoded = JWT.require(Algorithm.HMAC384(secretKey)).build().verify(token);
            final var expiresAt = decoded.getExpiresAt();

            if (expiresAt.before(new Date())) {
                throw new UnauthorizedException("Please, log in again");
            }

            return decoded.getSubject();
        } catch (JWTVerificationException e) {
            throw new UnauthorizedException(e.getMessage());
        }
    }
}
