package org.example.backendapi.security;

import org.example.backendapi.DAO.impl.AccountDaoImpl;
import org.example.backendapi.Dto.Account;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service

public class UserDetailServiceCustom implements UserDetailsService {
    private AccountDaoImpl accountDaoImpl;

    public UserDetailServiceCustom(AccountDaoImpl accountDaoImpl) {
        this.accountDaoImpl = accountDaoImpl;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> accountOptional = accountDaoImpl.get(username);
        if (accountOptional.isPresent()) {
            UserDetailCustom userDetailCustom = new UserDetailCustom();
            userDetailCustom.setAccount(accountOptional.get());
            return userDetailCustom;
        }
        throw new UsernameNotFoundException("không tìm thấy: "+username);
    }
}
