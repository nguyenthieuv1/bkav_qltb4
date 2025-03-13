package org.example.backendapi.Controller;

import org.example.backendapi.Dto.ChangePassword;
import org.example.backendapi.Dto.TokenRole;
import org.example.backendapi.Dto.UserDto;
import org.example.backendapi.Service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private AccountService accountService;
    public LoginController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto dto) {
        TokenRole tokenRole = accountService.generateToken(dto);
        return ResponseEntity.ok(tokenRole);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePassword dto) {
        accountService.changePassword(dto);
        return ResponseEntity.ok().build();
    }

}
