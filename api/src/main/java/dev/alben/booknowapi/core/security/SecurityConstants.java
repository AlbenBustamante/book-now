package dev.alben.booknowapi.core.security;

public final class SecurityConstants {
    public static final String[] WHITE_LIST = {
            "/auth",
            "/auth/**",
            "/swagger-ui",
            "/swagger-ui/**",
            "/v3",
            "/v3/**"
    };
}
