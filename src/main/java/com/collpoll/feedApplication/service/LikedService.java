package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.Handler.ResponseHandler;
import com.collpoll.feedApplication.entity.Comment;
import com.collpoll.feedApplication.entity.Liked;
import com.collpoll.feedApplication.entity.LikedPrimaryKey;
import com.collpoll.feedApplication.entity.Post;
import com.collpoll.feedApplication.repository.LikedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LikedService {

    @Autowired
    UserService userService;

    @Autowired
    PostService postService;

    @Autowired
    LikedRepo likedRepo;

    public ResponseEntity<Object> createLike(String userName, Long postId) {
        Integer userId = userName.hashCode();

        if(!postService.postExists(postId))
            throw new InvalidParameterException("Invalid PostID, no such post exists");

        try {
            if (!userService.existsById(userId)) {
                userService.createNewUser(userName);
            }

            LikedPrimaryKey newLikeKey = new LikedPrimaryKey(postId, userId);
            Liked newLiked = new Liked(newLikeKey);
            likedRepo.save(newLiked);

            return ResponseHandler.generateResponse("Comment made successfully", HttpStatus.CREATED, newLiked);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    public List<Post> getAllLikesByUser(String userName) {
        Integer userId = userName.hashCode();

        List<Liked> allLikes = likedRepo.findAllByLikedPrimaryKeyMadeByOrderByCreatedAt(userId);
        List<Post> allPostsLikedByUser = new ArrayList<>();

        for (Liked like : allLikes) {
            Optional<Post> post = postService.getPost(like.getLikedPrimaryKey().getPostId());
            post.ifPresent(allPostsLikedByUser::add);
        }
        return allPostsLikedByUser;
    }

    public Integer getLikesForPost(Long postId) {
        return likedRepo.countLikedByLikedPrimaryKey_PostId(postId);
    }
}
