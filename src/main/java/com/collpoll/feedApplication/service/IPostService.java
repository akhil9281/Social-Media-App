package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.Post;
import com.collpoll.feedApplication.entity.PostType;
import com.collpoll.feedApplication.repository.PostRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface IPostService {

    public Post createPost(String userName, PostType postType, String postData);

    public boolean postExists(Long postId);
    public List<Post> getFeed(Integer loadNumber);

    public List<Post> getAllPosts();

    public List<Post> getAllQuestions();

    public List<Post> getAllPostsByUser(String userName);

    public Optional<Post> getPost(Long postId);

    public void deletePost(Long postId);
}
