package co.icesi.tallerreact.repository;

import java.util.Optional;

import co.icesi.tallerreact.model.UserAccount;

public interface UserRepository {

    Optional<UserAccount> findByEmail(String email);
}
