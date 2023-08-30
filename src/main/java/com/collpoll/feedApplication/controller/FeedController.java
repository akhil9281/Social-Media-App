package com.collpoll.feedApplication.controller;

import com.collpoll.feedApplication.Handler.ResponseHandler;
import com.collpoll.feedApplication.entity.Comment;
import com.collpoll.feedApplication.entity.Post;
import com.collpoll.feedApplication.entity.PostType;
import com.collpoll.feedApplication.service.CommentService;
import com.collpoll.feedApplication.service.LikedService;
import com.collpoll.feedApplication.service.PostService;
import com.collpoll.feedApplication.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/feed")
@CrossOrigin(origins = {"http://127.0.0.1:5500/", "http://127.0.0.1:5501/"})
public class FeedController {

    final PostService postService;

    final LikedService likedService;

    final UserService userService;

    final CommentService commentService;

    public FeedController(PostService postService, LikedService likedService, UserService userService,
                          CommentService commentService) {
        this.postService = postService;
        this.likedService = likedService;
        this.userService = userService;
        this.commentService = commentService;
    }

    @GetMapping("/allPosts")
    public ResponseEntity<Object> getAllPosts(@RequestParam Integer loadNumber) {
        try {
            List<Post> allPostList = postService.getAllPosts(loadNumber);
            return ResponseHandler.generateResponse("List of all the Posts in ascending order by creation time", HttpStatus.OK, allPostList);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get Posts", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }

    }

    @GetMapping("/allPostsByUser")
    public ResponseEntity<Object> getAllPostsByUser(@RequestParam String userName) {
        try {
            if (!userService.userExists(userName)) {
                return ResponseHandler.generateResponse(HttpStatus.OK, "no such user found");
            }
            List<Post> allPostsByUser = postService.getAllPostsByUser(userName);
            return ResponseHandler.generateResponse("List of all the Posts by user - " + userName, HttpStatus.OK, allPostsByUser);
        }

        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get Posts by user - " + userName, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @GetMapping("/allCommentsByUser")
    public ResponseEntity<Object> getAllCommentsByUserByUser(@RequestParam String userName) {
        try {
            if (!userService.userExists(userName)) {
                return ResponseHandler.generateResponse(HttpStatus.OK, "no such user found");
            }
            List<Comment> allCommentsByUser = commentService.getAllCommentsByUser(userName);
            return ResponseHandler.generateResponse("List of all the Comments by user - " + userName, HttpStatus.OK, allCommentsByUser);
        }

        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get Comments by user - " + userName, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }

    }

    @GetMapping("/allCommentsForPost")
    public ResponseEntity<Object> getAllCommentsForPost(@RequestParam Long postId) {
        try {
            if (!postService.postExists(postId)) {
                return ResponseHandler.generateResponse(HttpStatus.OK, "no such post found");
            }
            List<Comment> allCommentsByUser = commentService.getAllCommentsForPost(postId);
            return ResponseHandler.generateResponse("List of all the Comments for Post - " + postId, HttpStatus.OK, allCommentsByUser);
        }

        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get Comments for Post - " + postId, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }

    }

    @GetMapping("/allLikesByUser")
    public ResponseEntity<Object> getAllLikesByUser(@RequestParam String userName) {
        try {
            if (!userService.userExists(userName)) {
                return ResponseHandler.generateResponse(HttpStatus.OK, "no such user found");
            }

            List<Post> allPostsLikedByUser = likedService.getAllLikesByUser(userName);
            return ResponseHandler.generateResponse("List of all the Posts liked by user - " + userName, HttpStatus.OK, allPostsLikedByUser);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get Posts liked by user - " + userName, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @PostMapping("/createPost")
    public ResponseEntity<Object> createPost(@RequestParam String userName, @RequestParam PostType postType, @RequestParam String postData) {
        try {
            Post newPost = postService.createPost(userName, postType, postData);
            return ResponseHandler.generateResponse("Post created successfully", HttpStatus.OK, newPost);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to generate Post", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @PostMapping("/createComment/{postId}")
    public ResponseEntity<Object> createComment(@RequestParam String userName, @PathVariable Long postId, @RequestParam String commentData) {
        return commentService.createComment(userName, postId, commentData);
    }

    @PostMapping("/createLike/{postId}")
    public ResponseEntity<Object> createLike(@RequestParam String userName, @PathVariable Long postId) {
        return likedService.createLike(userName, postId);
    }

    @DeleteMapping("/deletePost")
    public ResponseEntity<Object> deletePost(@RequestParam Long postId) {
        try {
            if (!postService.postExists((postId)))
                return ResponseHandler.generateResponse("No such post exists", HttpStatus.BAD_REQUEST);

            postService.deletePost(postId);
            return ResponseHandler.generateResponse("Successfully Deleted Post", HttpStatus.OK);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to delete Post", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @DeleteMapping("/deleteComment/{commentId}")
    public ResponseEntity<Object> deleteComment(@PathVariable Long commentId) {
        try {
            if (!commentService.commentExists((commentId)))
                return ResponseHandler.generateResponse("No such Comment exists", HttpStatus.BAD_REQUEST);

            commentService.deleteComment(commentId);
            return ResponseHandler.generateResponse("Successfully Deleted Comment", HttpStatus.OK);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to delete Comment - " + commentId, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/getLikes")
    public ResponseEntity<Object> getLikesForPost(@RequestParam Long postId) {
        try {
            if (!postService.postExists((postId)))
                return ResponseHandler.generateResponse("No such post exists", HttpStatus.BAD_REQUEST);

            int num = likedService.getLikesForPost(postId);
            return ResponseHandler.generateResponse("Successfully retrieved number of likes for Post", HttpStatus.OK, num);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to retrieve number of likes for Post", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/updateComment/{commentId}")
    public ResponseEntity<Object> updateComment(@PathVariable Long commentId, @RequestBody String commentBody) {
        try {
            if (!commentService.commentExists((commentId)))
                return ResponseHandler.generateResponse("No such post exists", HttpStatus.BAD_REQUEST);

            Comment comment = commentService.updateComment(commentId, commentBody);
            return ResponseHandler.generateResponse("Successfully updated Comment - " + commentId, HttpStatus.OK, comment);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to update Comment", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /*Todo
        1. try catch in controller
        2. Constructor injection


     */

}
