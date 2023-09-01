package com.collpoll.feedApplication.service.impl;

import com.collpoll.feedApplication.entity.User;
import com.collpoll.feedApplication.repository.UserRepo;
import com.collpoll.feedApplication.service.IUserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {

    final UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

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
