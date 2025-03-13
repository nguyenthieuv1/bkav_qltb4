package org.example.backendapi.DAO;

import org.example.backendapi.Dto.Account;
import org.example.backendapi.Dto.Device;
import org.example.backendapi.Dto.DeviceBorrow;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DeviceDao extends Dao<Device>{
    void addDeviceBorrowed(DeviceBorrow deviceBorrow);
    List<Device> getDevicesByName(String deviceName);
    void DeleteDeviceBorrowed(DeviceBorrow deviceBorrow);
    List<Device> getDeviceReturning();
    Page<Device> searchAllDevices(int page, int size, Device device);
}
