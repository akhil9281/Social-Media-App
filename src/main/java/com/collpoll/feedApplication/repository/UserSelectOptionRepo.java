package com.collpoll.feedApplication.repository;

import com.collpoll.feedApplication.entity.UserSelectOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSelectOptionRepo extends JpaRepository<UserSelectOption, Long> {
}
