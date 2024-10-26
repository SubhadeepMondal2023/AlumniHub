package com.alumnihub.AlumniHub.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import com.alumnihub.AlumniHub.model.UserModel;
import com.alumnihub.AlumniHub.repository.UserRepository;

public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public String saveUser(UserModel user) {
        if(user.getId() == null || user.getName() == null || user.getYear() == -1) {
            return "user credentials missing";
        }        
        
        userRepository.save(user);
        return "user registered succesfully";
    }
    public Optional<UserModel> getUser(ObjectId id) {
        Optional<UserModel> user = userRepository.findById(id);
        return user;
    }

    public List<UserModel> getAllUser() {
        return userRepository.findAll();
    }
}
