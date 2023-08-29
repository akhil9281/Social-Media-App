package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.User;
import com.collpoll.feedApplication.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public boolean existsById(Integer userId) {
        return userRepo.existsById(userId);
    }

    public User createNewUser(String userName) {
        Integer userId = userName.hashCode();
        User newUser = new User(userId, userName);

        return userRepo.save(newUser);
    }

    public boolean userExists(String userName) {
        Integer userId = userName.hashCode();
        return userRepo.existsById(userId);
    }
}
