package org.example.backendapi.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.example.backendapi.Dto.Device;
import org.example.backendapi.constants.NameTableConstant;

@Entity
@Table(name = NameTableConstant.DEVICE_TABLE)
@Data
public class DeviceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String note;
    private String description;
    private String status;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private AccountEntity account;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    public String getId() {
        return id+"";
    }

    public Device toDto() {
        Device device = new Device();
        device.setId(Long.parseLong(this.getId()));
        device.setName(this.getName());
        device.setNote(this.getNote());
        device.setDescription(this.getDescription());
        device.setStatus(this.getStatus());
        return device;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public CategoryEntity getCategory() {
        return category;
    }

    public void setCategory(CategoryEntity category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "DeviceEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", note='" + note + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", account=" + account +
                ", category=" + category +
                '}';
    }
}
