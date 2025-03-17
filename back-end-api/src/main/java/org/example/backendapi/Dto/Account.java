package org.example.backendapi.Dto;

import lombok.Data;
import org.example.backendapi.Entity.AccountEntity;

@Data
public class Account {
    private Long id;
    private String username;
    private String password;
    private String fullName;
    private String phone;
    private String address;
    private String role;
    private Boolean hasDevice;

    public Account() {
    }

    public Account(String role, String address, String phone, String fullName, String username) {
        this.role = role;
        this.address = address;
        this.phone = phone;
        this.fullName = fullName;
        this.username = username;
    }

    public Account(String role, String address, String phone, String fullName, String username, Long id) {
        this.role = role;
        this.address = address;
        this.phone = phone;
        this.fullName = fullName;
        this.username = username;
        this.id = id;
    }

    public Boolean getHasDevice() {
        return hasDevice;
    }

    public void setHasDevice(Boolean hasDevice) {
        this.hasDevice = hasDevice;
    }

    public AccountEntity toEntity(){
        AccountEntity account = new AccountEntity();
        account.setUsername(username);
        account.setPassword(password);
        account.setRole(role);
        account.setFullName(fullName);
        account.setAddress(address);
        account.setPhone(phone);
        account.setId(id);
        return account;
    }

    public Long getId() {
        return id;
    }


    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", fullName='" + fullName + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
