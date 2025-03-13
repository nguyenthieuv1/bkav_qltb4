package org.example.backendapi.Dto;

import lombok.Data;

@Data
public class DeviceBorrow {
    private Long deviceId;
    private Long accountId;

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    @Override
    public String toString() {
        return "DeviceBorrow{" +
                "deviceId=" + deviceId +
                ", accountId=" + accountId +
                '}';
    }
}
