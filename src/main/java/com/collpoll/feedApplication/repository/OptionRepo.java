package com.collpoll.feedApplication.repository;

import com.collpoll.feedApplication.entity.PollOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OptionRepo extends JpaRepository<PollOption, Long> {
    List<PollOption> findAllByPostId(Long postId);

    int countAllByPostId(Long postId);
}
