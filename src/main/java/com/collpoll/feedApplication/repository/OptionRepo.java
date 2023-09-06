package com.collpoll.feedApplication.repository;

import com.collpoll.feedApplication.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OptionRepo extends JpaRepository<Option, Long> {
    List<Option> findAllByPostId(Long postId);

}
