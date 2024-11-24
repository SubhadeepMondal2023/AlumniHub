package com.alumnihub.AlumniHub.storage;

import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;
import com.alumnihub.AlumniHub.model.User;

@Component
public class UserStorage {

    private ConcurrentHashMap<String, User> userMap = new ConcurrentHashMap<>();

    public void storeUserDetails(User user) {
        userMap.put(user.getEmail(), user);
    }

    public User getUserDetails(String email) {
        return userMap.get(email);
    }

    public void removeUserDetails(String email) {
        userMap.remove(email);
    }
}
