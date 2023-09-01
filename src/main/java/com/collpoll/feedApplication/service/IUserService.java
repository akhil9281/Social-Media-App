package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.User;
import com.collpoll.feedApplication.repository.UserRepo;
import org.springframework.stereotype.Service;

@Service
public interface IUserService {

    public boolean existsById(Integer userId);
    public User createNewUser(String userName);
    public boolean userExists(String userName);
}
