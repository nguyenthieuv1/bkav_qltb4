package org.example.backendapi.Service.impl;

import org.example.backendapi.DAO.DeviceDao;
import org.example.backendapi.DAO.impl.DeviceDaoImpl;
import org.example.backendapi.Dto.Account;
import org.example.backendapi.Dto.Device;
import org.example.backendapi.Dto.DeviceBorrow;
import org.example.backendapi.Service.DeviceService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements DeviceService {

    private DeviceDao deviceDao;

    public DeviceServiceImpl(DeviceDaoImpl deviceDao) {
        this.deviceDao = deviceDao;
    }


    @Override
    public void addAccountBorrowDevice(DeviceBorrow deviceBorrow) {
        deviceDao.addDeviceBorrowed(deviceBorrow);
    }

    @Override
    public List<Device> findAllByName(String name) {
        return deviceDao.getDevicesByName(name);
    }

    @Override
    public void confirmDeviceReturn(DeviceBorrow deviceBorrow) {
        deviceDao.DeleteDeviceBorrowed(deviceBorrow);
    }

    @Override
    public List<Device> getDeviceReturning() {
        return deviceDao.getDeviceReturning();
    }

    @Override
    public Page<Device> searchAllDevices(Integer page, Integer size, Device device) {
        return deviceDao.searchAllDevices(page,size,device);
    }

    @Override
    public void create(Device device) {
//        status 1: có sẵn
        device.setStatus("1");
        System.out.println(device);
        deviceDao.save(device);
    }

    @Override
    public void update(Device device) {
        deviceDao.save(device);
    }

    @Override
    public void delete(Long id) {
        Device device = new Device();
        device.setId(id);
        deviceDao.delete(device);
    }

    @Override
    public List<Device> findAll() {
        return deviceDao.getAll();
    }

    @Override
    public Device findById(int id) {
        Optional<Device> device = deviceDao.get(id);
        if (device.isPresent()){
            return device.get();
        }
        throw new RuntimeException("No device found with id: " + id);
    }

    @Override
    public Device findByName(String name) {
        return null;
    }

}
