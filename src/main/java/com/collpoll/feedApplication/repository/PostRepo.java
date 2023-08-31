package com.collpoll.feedApplication.repository;

import com.collpoll.feedApplication.entity.Post;
import com.collpoll.feedApplication.entity.PostType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PostRepo extends JpaRepository<Post, Long> {


    @Transactional
    @Query(value = "SELECT * FROM Post ORDER BY created_at desc limit :pageSize OFFSET :num", nativeQuery = true)
    List<Post> findNextPosts(@Param("pageSize") Integer pageSize, @Param("num") Integer num);

    List<Post> findAllByCreatedByIdOrderByCreatedAtDesc(Integer userId);

    List<Post> findAllByType(PostType postType);
}

