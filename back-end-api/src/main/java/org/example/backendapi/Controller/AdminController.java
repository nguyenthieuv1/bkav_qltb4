package org.example.backendapi.Controller;

import org.example.backendapi.Dto.Account;
import org.example.backendapi.Dto.Device;
import org.example.backendapi.Dto.DeviceBorrow;
import org.example.backendapi.Dto.UserDto;
import org.example.backendapi.Service.AccountService;
import org.example.backendapi.Service.DeviceService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")

public class AdminController {

    private AccountService accountService;
    private DeviceService deviceService;

    public AdminController(AccountService accountService, DeviceService deviceService) {
        this.accountService = accountService;
        this.deviceService = deviceService;
    }

    @GetMapping("/user/all/{page}")
    public ResponseEntity<?> getAllAccount(
            @PathVariable int page,
            @RequestParam String username,
            @RequestParam String fullName,
            @RequestParam String phone,
            @RequestParam String address,
            @RequestParam String role
    ) {
        Account account = new Account(role,address, phone, fullName, username);
        System.out.println(account);
        Page<Account> accounts = accountService.searchAllAccounts(page,10,account);
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/user/all")
    public ResponseEntity<?> getAllAccounts() {
        return ResponseEntity.ok(accountService.findAll());
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello";
    }


    @PostMapping("/user")
    public ResponseEntity<?> registerAccount(@RequestBody Account dto) {
        accountService.create(dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long id) {
        accountService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateAccount(
            @PathVariable Long id,
            @RequestBody Account dto
    ) {
        dto.setId(id);
        accountService.update(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user")
    public ResponseEntity<?> getAccountByUsername(@RequestParam String username) {
        return ResponseEntity.ok(accountService.getAccountByUsername(username));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable int id) {
        return ResponseEntity.ok(accountService.findById(id));
    }

   @PostMapping("/devices")
    public ResponseEntity<?> addDevice(@RequestBody Device device) {
        deviceService.create(device);
        return ResponseEntity.ok().build();
   }

   @PutMapping("/devices/{id}")
    public ResponseEntity<?> updateDevice(
            @PathVariable Long id,
            @RequestBody Device device
   ) {
        device.setId(id);
        deviceService.update(device);
        return ResponseEntity.ok().build();
   }

   @GetMapping("/devices/{id}")
   public ResponseEntity<?> getDeviceById(@PathVariable Integer id) {
        Device device = deviceService.findById(id);
        return ResponseEntity.ok(device);
   }

   @DeleteMapping("/devices/{id}")
    public ResponseEntity<?> deleteDevice(
            @PathVariable Long id
   ) {
        deviceService.delete(id);
        return ResponseEntity.ok().build();
   }

   @PostMapping("/devices-borrow")
    public ResponseEntity<?> assignDevice(
           @RequestBody DeviceBorrow deviceBorrow
           ) {
       System.out.println("dcsscscsf "+deviceBorrow);
        deviceService.addAccountBorrowDevice(deviceBorrow);

        return ResponseEntity.ok().build();
    }
    @GetMapping("/device")
    public ResponseEntity<?> getDeviceByName(@RequestParam String name) {
        List<Device> devices = deviceService.findAllByName(name);
        return ResponseEntity.ok(devices);
    }
    @PutMapping("/confirm-device-return")
    public ResponseEntity<?> confirmDeviceReturn(@RequestBody DeviceBorrow deviceBorrow) {
        deviceService.confirmDeviceReturn(deviceBorrow);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/devices/all/{page}")
    public ResponseEntity<?> getAllDevice(
            @PathVariable Integer page,
            @RequestParam String name,
            @RequestParam String id,
            @RequestParam String description,
            @RequestParam String type
    ) {
        Long idDevice = null;
        if (id != null && !id.isEmpty()){
            idDevice = Long.parseLong(id);
        }
        Device devicefillter = new Device(idDevice,name,description,type);
        System.out.println(devicefillter);
        Page<Device> devices = deviceService.searchAllDevices(page,10,devicefillter);
        return ResponseEntity.ok(devices);
    }

    @GetMapping("/devices/return")
    public ResponseEntity<?> getAllDeviceReturn() {

        return ResponseEntity.ok(deviceService.getDeviceReturning());
    }
}
