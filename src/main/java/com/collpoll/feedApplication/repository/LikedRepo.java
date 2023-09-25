package com.collpoll.feedApplication.repository;

import com.collpoll.feedApplication.entity.Comment;
import com.collpoll.feedApplication.entity.Liked;
import com.collpoll.feedApplication.entity.LikedPrimaryKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikedRepo extends JpaRepository<Liked, Long> {
    List<Liked> findAllByLikedPrimaryKeyMadeByOrderByCreatedAt(Integer userId);

    List<Liked> findAllByLikedPrimaryKey_PostId(Long postId);

    Integer countLikedByLikedPrimaryKey_PostId(Long postId);

    Boolean existsByLikedPrimaryKey(LikedPrimaryKey primaryKey);
}
