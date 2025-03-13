package org.example.backendapi.Controller;

import org.example.backendapi.Dto.UserDemoApi;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/demo")
public class DemoController {

    @GetMapping("/request-param")
    public ResponseEntity<?> reuestParam(
            @RequestParam String name,
            @RequestParam String age
    ) {
        System.out.println(name+" "+age);
        return ResponseEntity.ok(name+" "+age);
    }
    @GetMapping("/hello")
    public String hello() {
        return "Hello";
    }

    @GetMapping("/{number}")
    public ResponseEntity<?> demo(@PathVariable Integer number) {
        return ResponseEntity.ok(number);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUser() {
        List<UserDemoApi> listUsers = new ArrayList<>();
        listUsers.add(new UserDemoApi("name 1",33,"hanoi"));
        listUsers.add(new UserDemoApi("name 2",33,"hanoi"));
        listUsers.add(new UserDemoApi("name 3",33,"hanoi"));
        listUsers.add(new UserDemoApi("name 4",33,"hanoi"));
        listUsers.add(new UserDemoApi("name 5",33,"hanoi"));
        return ResponseEntity.ok(listUsers);
    }
    @GetMapping("/user")
    public ResponseEntity<?> getOneUser() {
        UserDemoApi user = new UserDemoApi("name 1",33,"hanoi");
        return ResponseEntity.ok(user);
    }

    @GetMapping("/user-search")
    public ResponseEntity<?> searchUser(@RequestParam String name) {
        List<UserDemoApi> listUsers = new ArrayList<>();
        listUsers.add(new UserDemoApi("name 1",33,"hanoi"));
        listUsers.add(new UserDemoApi("name 2",33,"hanoi"));
        listUsers.add(new UserDemoApi("name 3",33,"hanoi"));
        listUsers.add(new UserDemoApi("name 4",33,"hanoi"));
        listUsers.add(new UserDemoApi("name 5",33,"hanoi"));

        List<UserDemoApi> result = new ArrayList<>();
        for(UserDemoApi user : listUsers) {
            if(user.getName().contains(name)) {
                result.add(user);
            }
        }
        return ResponseEntity.ok(result);
    }
    @PostMapping("/user")
    public ResponseEntity<?> addUser(@RequestBody UserDemoApi user) {
        System.out.println(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Integer id
    ) {
        System.out.println("delete: "+id);
        return ResponseEntity.ok(id);
    }
    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@RequestBody UserDemoApi user) {
        System.out.println(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/ok")
    public ResponseEntity<?> demoTest(){
        return ResponseEntity.ok("okokok");
    }

}

