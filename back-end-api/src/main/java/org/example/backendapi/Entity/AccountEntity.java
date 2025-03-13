package org.example.backendapi.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.example.backendapi.Dto.Account;
import org.example.backendapi.constants.NameTableConstant;

import java.util.List;

@Entity
@Table(name = NameTableConstant.ACCOUNT_TABLE)
@Data
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String role;
    private String fullName;
    private String address;
    private String phone;

    @OneToMany(mappedBy = "account")
    private List<DeviceEntity> deviceEntities;

    public Account toDto(){
        Account account = new Account();
        account.setId(id);
        account.setUsername(username);
        account.setPassword(password);
        account.setRole(role);
        account.setFullName(fullName);
        account.setAddress(address);
        account.setPhone(phone);
        return account;
    }

    public Long getId() {
        return id;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<DeviceEntity> getDeviceEntities() {
        return deviceEntities;
    }

    public void setDeviceEntities(List<DeviceEntity> deviceEntities) {
        this.deviceEntities = deviceEntities;
    }
}
