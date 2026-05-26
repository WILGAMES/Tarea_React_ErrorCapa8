package co.icesi.tallerreact.repository;

import java.util.Locale;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import co.icesi.tallerreact.model.UserAccount;

@Repository
public class InMemoryUserRepository implements UserRepository {

    private final UserAccount demoUser;

    public InMemoryUserRepository(
        @Value("${app.auth.user-email}") String email,
        @Value("${app.auth.user-password}") String password
    ) {
        this.demoUser = new UserAccount(email, password);
    }

    @Override
    public Optional<UserAccount> findByEmail(String email) {
        if (demoUser.email().toLowerCase(Locale.ROOT).equals(email.toLowerCase(Locale.ROOT))) {
            return Optional.of(demoUser);
        }

        return Optional.empty();
    }
}
