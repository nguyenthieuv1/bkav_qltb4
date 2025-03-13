package org.example.backendapi.util;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private final Key SECRET_KEY ;
    private final long EXPIRATION_TIME = 1000*60*60; // 1 hour

    public JwtUtil() {
        SECRET_KEY = getSecretKey();
    }

    public Key getSecretKey() {
        return Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<String, Object>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();

    }
    // giải mã token
    private Claims extractClaims(String token) {
        return Jwts.parser()                           // 1. Tạo một đối tượng parser để phân tích token JWT.
                .setSigningKey(SECRET_KEY)             // 2. Thiết lập khóa bí mật (SECRET_KEY) dùng để xác minh token.
                .parseClaimsJws(token)                 // 3. Phân tích và xác minh chữ ký của token JWT.
                .getBody();                            // 4. Lấy phần body (claims) của token.
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean validateToken(String token, String username) {
        final String tokenUsername = extractUsername(token);
        return (username.equals(tokenUsername) && !isTokenExpired(token));
    }

}
