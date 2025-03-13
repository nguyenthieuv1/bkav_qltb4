package org.example.backendapi.Dto;

import java.util.List;

public class ListDeviceReturn {
    private List<Device> listDevices;

    public List<Device> getListDevices() {
        return listDevices;
    }

    public void setListDevices(List<Device> listDevices) {
        this.listDevices = listDevices;
    }

    @Override
    public String toString() {
        return "ListDeviceReturn{" +
                "listDevices=" + listDevices +
                '}';
    }
}
