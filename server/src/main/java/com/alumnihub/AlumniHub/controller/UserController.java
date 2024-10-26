package com.alumnihub.AlumniHub.controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alumnihub.AlumniHub.model.UserModel;
import com.alumnihub.AlumniHub.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile/{id}")
    public UserModel getProfile(@RequestParam ObjectId id) {
        return userService.getUser(id).orElse(null);    
    }


    @GetMapping("/all-user")
    public List<UserModel> getAllUser()  {
        return userService.getAllUser();
    }
 
    
    @PostMapping("/register")
    public String registerUser(@RequestBody UserModel user) {
        String res = userService.saveUser(user);
        return res;
    }
    
    
}
