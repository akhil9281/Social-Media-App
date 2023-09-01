package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.Liked;
import com.collpoll.feedApplication.entity.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ILikedService {

    public Liked createLike(String userName, Long postId);
    public List<Post> getAllLikesByUser(String userName);

    public Integer getCountOfLikesForPost(Long postId);
    public void deleteLikesOfPost(Long postId);
}
