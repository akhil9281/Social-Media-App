package com.collpoll.feedApplication.repository;

import com.collpoll.feedApplication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
}
