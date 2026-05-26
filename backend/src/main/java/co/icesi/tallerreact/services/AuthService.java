package co.icesi.tallerreact.services;

import org.springframework.stereotype.Service;

import co.icesi.tallerreact.dto.LoginRequest;
import co.icesi.tallerreact.dto.LoginResponse;
import co.icesi.tallerreact.exception.UnauthorizedException;
import co.icesi.tallerreact.model.UserAccount;
import co.icesi.tallerreact.repository.UserRepository;
import co.icesi.tallerreact.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        UserAccount user = userRepository.findByEmail(request.email())
            .orElseThrow(() -> new UnauthorizedException("Credenciales inválidas"));

        if (!user.password().equals(request.password())) {
            throw new UnauthorizedException("Credenciales inválidas");
        }

        String token = jwtService.createToken(user.email());
        return new LoginResponse(token, user.email());
    }
}
