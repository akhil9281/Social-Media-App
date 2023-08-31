package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.Post;
import com.collpoll.feedApplication.entity.PostType;
import com.collpoll.feedApplication.repository.PostRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    final UserService userService;

    final PostRepo postRepo;


    public PostService(UserService userService, PostRepo postRepo) {
        this.userService = userService;
        this.postRepo = postRepo;;
    }


    public Post createPost(String userName, PostType postType, String postData) {
        if (!userService.userExists(userName)) {
            userService.createNewUser(userName);
        }

        Post newPost = new Post(userName, userName.hashCode(), postType, postData);
        return postRepo.save(newPost);
    }

    public boolean postExists(Long postId) {
        return postRepo.existsById(postId);
    }

    public List<Post> getFeed(Integer loadNumber) {
        int pageSize = 5;
        List<Post> feed = postRepo.findNextPosts(pageSize, loadNumber*pageSize);
        return feed;
    }

    public List<Post> getAllPosts() {
        List<Post> allPosts = postRepo.findAllByType(PostType.Post);
        return allPosts;
    }

    public List<Post> getAllQuestions() {
        List<Post> allQuestions = postRepo.findAllByType(PostType.Question);
        return allQuestions;
    }


    public List<Post> getAllPostsByUser(String userName) {
        Integer userId = userName.hashCode();

        List<Post> allPosts = postRepo.findAllByCreatedByIdOrderByCreatedAtDesc(userId);
        return allPosts;
    }

    public Optional<Post> getPost(Long postId) {
        return postRepo.findById(postId);
    }


    public void deletePost(Long postId) {
        postRepo.deleteById(postId);
    }
}
