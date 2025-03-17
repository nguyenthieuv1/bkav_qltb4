package org.example.backendapi.DAO.impl;

import jakarta.persistence.Entity;
import org.example.backendapi.DAO.DeviceDao;
import org.example.backendapi.Dto.Account;
import org.example.backendapi.Dto.Device;
import org.example.backendapi.Dto.DeviceBorrow;
import org.example.backendapi.Entity.AccountEntity;
import org.example.backendapi.Entity.CategoryEntity;
import org.example.backendapi.Entity.DeviceEntity;
import org.example.backendapi.repository.AccountRepository;
import org.example.backendapi.repository.CategoryRepository;
import org.example.backendapi.repository.DeviceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class DeviceDaoImpl implements DeviceDao{

    private DeviceRepository deviceRepository;
    private AccountRepository accountRepository;
    private CategoryRepository categoryRepository;

    public DeviceDaoImpl(DeviceRepository deviceRepository, AccountRepository accountRepository, CategoryRepository categoryRepository) {
        this.deviceRepository = deviceRepository;
        this.accountRepository = accountRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Optional<Device> get(long id) {
        Optional<DeviceEntity> deviceEntity = deviceRepository.findById(id);
        if(deviceEntity.isPresent()) {
            Device device = deviceEntity.get().toDto();
            CategoryEntity categoryEntity = deviceEntity.get().getCategory();
            if (categoryEntity != null) {
                device.setType(categoryEntity.getName());
                device.setCategoryId(categoryEntity.getId());
            }
            return Optional.of(device);
        }
        throw new RuntimeException("device not found!!!!!!!!!!");
    }

    @Override
    public Optional<Device> get(String keyWord) {
        return Optional.empty();
    }

    @Override
    public Optional<Device> get(Device Dto) {
        return Optional.empty();
    }

    @Override
    public List<Device> getAll() {
        List<DeviceEntity> deviceEntities = deviceRepository.findAll();
        List<Device> devices = new ArrayList<>();
        for (DeviceEntity deviceEntity : deviceEntities) {
            Device device = deviceEntity.toDto();
            AccountEntity accountEntity = deviceEntity.getAccount();
            if (accountEntity != null) {
                device.setAccountAssignName(accountEntity.getUsername());
            }

            CategoryEntity categoryEntity = deviceEntity.getCategory();
            if (categoryEntity != null) {
                device.setType(categoryEntity.getName());
            }
            System.out.println(device);
            devices.add(device);
        }
        return devices;
    }

    @Override
    public void save(Device device) {
        DeviceEntity deviceEntity = device.toEntity();
        CategoryEntity category = getCategoryEntityById(device.getCategoryId());
        deviceEntity.setCategory(category);

        //        set account admin to device
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        AccountEntity accountEntity = getAccountEntityByUsername(username);
        deviceEntity.setAccount(accountEntity);


        deviceRepository.save(deviceEntity);
    }

    public CategoryEntity getCategoryEntityById(long id) {
        Optional<CategoryEntity> categoryEntity = categoryRepository.findById(id);
        if(categoryEntity.isPresent()) {
            return categoryEntity.get();
        }
        throw new RuntimeException("category not found!!!!!!!!!!");
    }

    @Override
    public void update(Device device, String[] params) {

    }

    @Override
    public void delete(Device device) {
        Optional<DeviceEntity> deviceEntity = deviceRepository.findById(device.getId());
        String adminUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if(deviceEntity.isPresent()) {
            AccountEntity accountEntity = deviceEntity.get().getAccount();
            if (!accountEntity.getUsername().equals(adminUsername)) {
                throw new RuntimeException("thiết bị đang có người sử dụng");
            }
        }
        try {
            deviceRepository.deleteById(device.getId());
        } catch (Exception e) {
            throw new RuntimeException("device not found!!!!!!!!!! "+e.getMessage());
        }
    }

    @Override
    public void addDeviceBorrowed(DeviceBorrow deviceBorrow) {

        DeviceEntity deviceEntityToBorrow = getDeviceEntity(deviceBorrow.getDeviceId());
        AccountEntity accountEntityBorrow = getAccountEntity(deviceBorrow.getAccountId());
        deviceEntityToBorrow.setAccount(accountEntityBorrow);
        deviceEntityToBorrow.setStatus("0");
        deviceRepository.save(deviceEntityToBorrow);
    }

    public AccountEntity getAccountEntityByUsername(String username) {
        AccountEntity accountEntity = accountRepository.findByUsername(username);
        if (accountEntity != null) {
            return accountEntity;
        }
        throw new RuntimeException("Account not found!!!!");
    }

    public DeviceEntity getDeviceEntity(long id) {
        Optional<DeviceEntity> deviceEntity = deviceRepository.findById(id);
        if(deviceEntity.isPresent()) {
            return deviceEntity.get();
        }
        throw new RuntimeException("device not found!!!!!!!!!!!");
    }
    public AccountEntity getAccountEntity(long id) {
        Optional<AccountEntity> accountEntity = accountRepository.findById(id);
        if(accountEntity.isPresent()) {
            return accountEntity.get();
        }

        throw new RuntimeException("account not found!!!!!!!!!!!");
    }

    @Override
    public List<Device> getDevicesByName(String deviceName) {
        List<DeviceEntity> deviceEntitys = deviceRepository.findByNameLikeIgnoreCase(deviceName);
        List<Device> devices = new ArrayList<>();
        if(deviceEntitys != null) {
            for(DeviceEntity deviceEntity : deviceEntitys) {
                Device device = deviceEntity.toDto();
                CategoryEntity categoryEntity = deviceEntity.getCategory();
                if (categoryEntity!=null){
                    device.setType(categoryEntity.getName());
                }
                devices.add(device);
            }
            return devices;
        }
        throw new RuntimeException("device not found!!!!!!!!!!");
    }

//    public AccountEntity getAdminEntity() {
//        return accountRepository.findByRole("ADMIN");
//    }

    @Override
    public void DeleteDeviceBorrowed(DeviceBorrow deviceBorrow) {
        DeviceEntity deviceEntity = getDeviceEntity(deviceBorrow.getDeviceId());
        deviceEntity.setStatus("1");
        deviceEntity.setAccount(null);
        deviceRepository.save(deviceEntity);
    }

    @Override
    public List<Device> getDeviceReturning() {
        List<DeviceEntity> deviceEntities = deviceRepository.findByStatus("2");
        List<Device> devices = new ArrayList<>();
        for (DeviceEntity deviceEntity : deviceEntities) {
            Device device = deviceEntity.toDto();
            CategoryEntity categoryEntity = deviceEntity.getCategory();
            if (categoryEntity != null) {
                device.setType(categoryEntity.getName());
            }
            AccountEntity accountEntity = deviceEntity.getAccount();
            if (accountEntity != null) {
                device.setAccountAssignName(accountEntity.getUsername());
            }
            devices.add(device);
        }
        return devices;
    }

    @Override
    public Page<Device> searchAllDevices(int page, int size, Device device) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());

        // Truy vấn danh sách thiết bị từ database
        Page<DeviceEntity> deviceEntities = deviceRepository.searchUser(pageable,
                device.getId(), device.getName(), device.getDescription(), device.getType());

        // Chuyển đổi từ Page<DeviceEntity> sang Page<Device>
        return deviceEntities.map(entity -> {
            Device dto = entity.toDto();
            if (entity.getCategory() != null) {
                dto.setType(entity.getCategory().getName());
            }
            if (entity.getAccount() != null) {
                dto.setAccountAssignName(entity.getAccount().getUsername());
            }
            return dto;
        });
    }


}
