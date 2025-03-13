package org.example.backendapi.Service;

import org.example.backendapi.Dto.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AccountService extends BaseService<Account> {

    TokenRole generateToken(UserDto dto);
    Account getAccountByUsername(String username);
    List<Device> getDevicesByAccount();
    void returnDevice(ListDeviceReturn deviceReturns);
    void changePassword(ChangePassword changePassword);
    void returnOneDevice(int id);
    Page<Account> getAllAccounts(Integer page, Integer size);
    Page<Account> searchAllAccounts(Integer page, Integer size,Account account);
}
