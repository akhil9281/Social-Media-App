package com.collpoll.feedApplication.repository;

import com.collpoll.feedApplication.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepoImpl extends JpaRepository<Comment, Long> {
    List<Comment> findAllByCreatedByIdOrderByCreatedAt(Integer userId);

    List<Comment> findAllByPostIdOrderByCreatedAt(Long postId);

    Integer countCommentsByPostId(Long postId);


}
