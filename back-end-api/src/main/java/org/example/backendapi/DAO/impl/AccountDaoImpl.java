package org.example.backendapi.DAO.impl;

import org.example.backendapi.DAO.AccountDao;
import org.example.backendapi.DAO.Dao;
import org.example.backendapi.Dto.Account;
import org.example.backendapi.Dto.ChangePassword;
import org.example.backendapi.Dto.Device;
import org.example.backendapi.Dto.ListDeviceReturn;
import org.example.backendapi.Entity.AccountEntity;
import org.example.backendapi.Entity.DeviceEntity;
import org.example.backendapi.repository.AccountRepository;
import org.example.backendapi.repository.DeviceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Repository
//@Data
public class AccountDaoImpl implements AccountDao {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountDaoImpl(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<Account> get(long id) {
        Optional<AccountEntity> accountEntity = accountRepository.findById(id);
        if (accountEntity.isPresent()) {
            Account account = accountEntity.get().toDto();
            return Optional.of(account);
        }
        throw new RuntimeException("Account not found!!!!!!!!!!!");
    }

    @Override
    public Optional<Account> get(String keyWord) {
        AccountEntity accountEntity = getAccountEntityByUsername(keyWord);
        Account account = accountEntity.toDto();
        return Optional.of(account);
    }

    public AccountEntity getAccountEntityByUsername(String username) {
        AccountEntity accountEntity = accountRepository.findByUsername(username);
        if (accountEntity != null) {
            return accountEntity;
        }
        throw new RuntimeException("Account not found!!!!");
    }

    @Override
    public Optional<Account> get(Account Dto) {
        return Optional.empty();
    }

    @Override
    public List<Account> getAll() {
        List<AccountEntity> accountEntities = accountRepository.findAll();
        List<Account> accounts = new ArrayList<>();
        for (AccountEntity accountEntity : accountEntities) {
            Account account = accountEntity.toDto();
            accounts.add(account);
        }
        return accounts;
    }


    @Override
    public void save(Account accountDto) {
        AccountEntity accountEntity = accountDto.toEntity();
        accountRepository.save(accountEntity);
    }


    @Override
    public void update(Account account, String[] params) {
        AccountEntity accountEntity = account.toEntity();
        accountRepository.save(accountEntity);
    }

    @Override
    public void delete(Account account) {
//        Long id = account.getId();
//        accountRepository.deleteById(id);
//        Optional<AccountEntity> accountEntity = accountRepository.findById(id);
//        if (accountEntity.isPresent()) {
//            accountRepository.delete(accountEntity.get());
//        }
//        else{
//            throw new RuntimeException("Account not found!!!!!!!!!!!!");
//        }
        try {
            accountRepository.deleteById(account.getId());
        } catch (Exception e) {
            throw new RuntimeException("Account not found!!!!!!!!!!! " + e.getMessage());
        }
    }


    @Override
    public List<Device> getDevicesBorrowedByAccount(String username) {
        AccountEntity accountEntity = getAccountEntityByUsername(username);
        List<DeviceEntity> deviceEntities = accountEntity.getDeviceEntities();
        List<Device> devices = new ArrayList<>();
        for (DeviceEntity deviceEntity : deviceEntities) {
            devices.add(deviceEntity.toDto());
        }
        return devices;
    }

    @Override
    @Transactional
    public void requestDeviceBorrowedByAccount(String username, ListDeviceReturn listDeviceReturn) {
        AccountEntity accountEntity = getAccountEntityByUsername(username);
        List<DeviceEntity> deviceEntities = accountEntity.getDeviceEntities();
        returnDeviceBorrowedByAccount(deviceEntities, listDeviceReturn);
        accountRepository.save(accountEntity);
    }

    @Override
    public void changePassword(String username, ChangePassword changePassword) {
        AccountEntity accountEntity = getAccountEntityByUsername(username);
        String oldPasswordHashInDataBase = accountEntity.getPassword();

        System.out.println(changePassword);
        if (!passwordEncoder.matches(changePassword.getOldPassword(), oldPasswordHashInDataBase)) {
            throw new RuntimeException("Old password hash does not match!!!!!");
        }
        String newPasswordHash = passwordEncoder.encode(changePassword.getNewPassword());
        accountEntity.setPassword(newPasswordHash);
        accountRepository.save(accountEntity);
    }

    @Override
    public boolean isUserNameExist(String username) {
        AccountEntity accountEntity = accountRepository.findByUsername(username);
        return accountEntity != null;
    }

    @Override
    public String getUsernamebyId(Long id) {
        Optional<AccountEntity> accountEntity = accountRepository.findById(id);
        if (accountEntity.isPresent()) {
            return accountEntity.get().getUsername();
        }
        return "";
    }

    @Override
    public void returnDevice(int deviceId, String username) {
        AccountEntity accountEntity = getAccountEntityByUsername(username);
        List<DeviceEntity> deviceEntities = accountEntity.getDeviceEntities();
        for (int i = 0; i < deviceEntities.size(); i++) {
            int deviceEntityId = Integer.parseInt((deviceEntities.get(i).getId()));
            if ( deviceEntityId == deviceId) {
                deviceEntities.get(i).setStatus("2");
            }
        }
        accountEntity.setDeviceEntities(deviceEntities);
        accountRepository.save(accountEntity);
    }

    @Override
    public Page<Account> getAllAccounts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending()); // Sắp xếp theo ID tăng dần
        Page<AccountEntity> accountEntities = accountRepository.findAll(pageable);

        return accountEntities.map(AccountEntity::toDto);
    }

    @Override
    public Page<Account> searchAllAccounts(int page, int size, Account account) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Page<AccountEntity> accountEntities =
                accountRepository.searchAccounts(pageable, account.getUsername(),
                        account.getRole(),account.getFullName(), account.getAddress(),account.getPhone());
        return accountEntities.map(AccountEntity::toDtoHasCheckListDevice);
    }


    public void returnDeviceBorrowedByAccount(List<DeviceEntity> deviceInDataBase, ListDeviceReturn listDeviceReturn) {
        Map<Long, Long> deviceBorrowed = new HashMap<>();

        for (Device device : listDeviceReturn.getListDevices()) {
            Long deviceId = device.getId();
            deviceBorrowed.put(deviceId, 1L);
        }

        for (int i = 0; i < deviceInDataBase.size(); i++) {
            Long deviceId = Long.parseLong(deviceInDataBase.get(i).getId());
            if (deviceBorrowed.getOrDefault(deviceId, 0L) == 1) {
                deviceBorrowed.remove(deviceId);
                deviceInDataBase.get(i).setStatus("2");
            }
        }

    }
}
