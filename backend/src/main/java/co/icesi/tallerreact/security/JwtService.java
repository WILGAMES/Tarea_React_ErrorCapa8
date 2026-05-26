package co.icesi.tallerreact.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private static final Base64.Encoder URL_ENCODER = Base64.getUrlEncoder().withoutPadding();
    private static final Base64.Decoder URL_DECODER = Base64.getUrlDecoder();

    private final String secret;
    private final long expirationHours;

    public JwtService(
        @Value("${app.jwt.secret}") String secret,
        @Value("${app.jwt.expiration-hours}") long expirationHours
    ) {
        this.secret = secret;
        this.expirationHours = expirationHours;
    }

    public String createToken(String subject) {
        String header = encodeJson("{\"alg\":\"HS256\",\"typ\":\"JWT\"}");
        long expiresAt = Instant.now().plus(expirationHours, ChronoUnit.HOURS).getEpochSecond();
        String payload = encodeJson("{\"sub\":\"" + escape(subject) + "\",\"exp\":" + expiresAt + "}");
        String signature = sign(header + "." + payload);
        return header + "." + payload + "." + signature;
    }

    public boolean isValid(String token) {
        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            return false;
        }

        String expectedSignature = sign(parts[0] + "." + parts[1]);
        if (!MessageDigest.isEqual(expectedSignature.getBytes(StandardCharsets.UTF_8), parts[2].getBytes(StandardCharsets.UTF_8))) {
            return false;
        }

        Long expiration = extractExpiration(token);
        return expiration != null && expiration > Instant.now().getEpochSecond();
    }

    public String extractSubject(String token) {
        String payloadJson = decodePayload(token);
        return extractJsonValue(payloadJson, "sub");
    }

    private Long extractExpiration(String token) {
        String payloadJson = decodePayload(token);
        String value = extractJsonValue(payloadJson, "exp");
        if (value == null) {
            return null;
        }

        return Long.parseLong(value);
    }

    private String decodePayload(String token) {
        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            throw new IllegalArgumentException("Token inválido");
        }

        return new String(URL_DECODER.decode(parts[1]), StandardCharsets.UTF_8);
    }

    private String sign(String content) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return URL_ENCODER.encodeToString(mac.doFinal(content.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception exception) {
            throw new IllegalStateException("No fue posible firmar el token", exception);
        }
    }

    private String encodeJson(String json) {
        return URL_ENCODER.encodeToString(json.getBytes(StandardCharsets.UTF_8));
    }

    private String extractJsonValue(String json, String key) {
        String stringNeedle = "\"" + key + "\":\"";
        int stringIndex = json.indexOf(stringNeedle);
        if (stringIndex >= 0) {
            int valueStart = stringIndex + stringNeedle.length();
            int valueEnd = json.indexOf("\"", valueStart);
            return json.substring(valueStart, valueEnd);
        }

        String numberNeedle = "\"" + key + "\":";
        int numberIndex = json.indexOf(numberNeedle);
        if (numberIndex >= 0) {
            int valueStart = numberIndex + numberNeedle.length();
            int valueEnd = json.indexOf(",", valueStart);
            if (valueEnd < 0) {
                valueEnd = json.indexOf("}", valueStart);
            }
            return json.substring(valueStart, valueEnd).trim();
        }

        return null;
    }

    private String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
