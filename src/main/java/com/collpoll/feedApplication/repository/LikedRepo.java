package com.collpoll.feedApplication.repository;

import com.collpoll.feedApplication.entity.Comment;
import com.collpoll.feedApplication.entity.Liked;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikedRepo extends JpaRepository<Liked, Long> {
    List<Liked> findAllByLikedPrimaryKeyMadeByOrderByCreatedAt(Integer userId);

    List<Liked> findAllByLikedPrimaryKeyPostId(Long postId);

    Integer countLikedByLikedPrimaryKey_PostId(Long postId);
}
