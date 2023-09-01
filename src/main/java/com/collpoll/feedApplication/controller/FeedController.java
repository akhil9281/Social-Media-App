package com.collpoll.feedApplication.controller;

import com.collpoll.feedApplication.Handler.ResponseHandler;
import com.collpoll.feedApplication.entity.Comment;
import com.collpoll.feedApplication.entity.Liked;
import com.collpoll.feedApplication.entity.Post;
import com.collpoll.feedApplication.entity.PostType;
import com.collpoll.feedApplication.service.impl.CommentServiceImpl;
import com.collpoll.feedApplication.service.impl.LikedServiceImpl;
import com.collpoll.feedApplication.service.impl.PostServiceImpl;
import com.collpoll.feedApplication.service.impl.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController @Transactional
@RequestMapping("/feed")
@CrossOrigin(origins = {"http://127.0.0.1:5500/", "http://127.0.0.1:5501/"})
public class FeedController {

    final PostServiceImpl postServiceImpl;

    final LikedServiceImpl likedServiceImpl;

    final UserServiceImpl userServiceImpl;

    final CommentServiceImpl commentServiceImpl;

    public FeedController(PostServiceImpl postServiceImpl, LikedServiceImpl likedServiceImpl, UserServiceImpl userServiceImpl,
                          CommentServiceImpl commentServiceImpl) {
        this.postServiceImpl = postServiceImpl;
        this.likedServiceImpl = likedServiceImpl;
        this.userServiceImpl = userServiceImpl;
        this.commentServiceImpl = commentServiceImpl;
    }

    /**  POST Methods
     *
     * @param loadNumber
     * @return
     */

    @GetMapping("/allPosts")
    public ResponseEntity<Object> getAllPosts(@RequestParam Integer loadNumber) {
        try {
            List<Post> allPostList = postServiceImpl.getFeed(loadNumber);
            return ResponseHandler.generateResponse("List of all the Posts in descending order by creation time", HttpStatus.OK, allPostList);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get Posts", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

    }

    @GetMapping("/allPostsByUser")
    public ResponseEntity<Object> getAllPostsByUser(@RequestParam String userName) {
        try {
            if (!userServiceImpl.userExists(userName)) {
                return ResponseHandler.generateResponse("no such User found", HttpStatus.OK, new ArrayList<Post>());
            }
            List<Post> allPostsByUser = postServiceImpl.getAllPostsByUser(userName);
            return ResponseHandler.generateResponse("List of all the Posts by user - " + userName, HttpStatus.OK, allPostsByUser);
        }

        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get Posts by user - " + userName, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @PostMapping("/createPost")
    public ResponseEntity<Object> createPost(@RequestParam String userName, @RequestParam PostType postType, @RequestParam String postData) {
        try {
            Post newPost = postServiceImpl.createPost(userName, postType, postData);
            return ResponseHandler.generateResponse("Post created successfully", HttpStatus.OK, newPost);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to generate Post", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @DeleteMapping("/deletePost")
    public ResponseEntity<Object> deletePost(@RequestParam Long postId) {
        try {
            if (!postServiceImpl.postExists((postId)))
                return ResponseHandler.generateResponse("No such post exists", HttpStatus.BAD_REQUEST);

            likedServiceImpl.deleteLikesOfPost(postId);
            commentServiceImpl.deleteCommentsOfPost(postId);
            postServiceImpl.deletePost(postId);

            return ResponseHandler.generateResponse("Successfully Deleted Post", HttpStatus.OK);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to delete Post", HttpStatus.INTERNAL_SERVER_ERROR, (Object[]) e.getStackTrace());
        }
    }

    @GetMapping("/mostLikedPost")
    public ResponseEntity<Object> getMostLikePost() {
        try {
            List<Post> postList = postServiceImpl.getAllPosts();
            Post mostLikePost = null;
            int max = -1;
            for (Post post: postList) {
                int countOfLikes = likedServiceImpl.getCountOfLikesForPost(post.getId());
                if (countOfLikes > max) {
                    max = countOfLikes;
                    mostLikePost = post;
                }
            }

            return ResponseHandler.generateResponse("Found the most liked post", HttpStatus.OK, mostLikePost);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get MostLikedPost", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/mostDiscussedQuestion")
    public ResponseEntity<Object> getMostDiscussedQuestion() {
        try {
            List<Post> postList = postServiceImpl.getAllQuestions();
            Post mostDiscussedQuestion = null;
            int max = -1;
            for (Post post: postList) {
                int countOfComments = commentServiceImpl.getCountOfCommentsForPost(post.getId());
                if (countOfComments > max) {
                    max = countOfComments;
                    mostDiscussedQuestion = post;
                }
            }

            return ResponseHandler.generateResponse("Found the most liked post", HttpStatus.OK, mostDiscussedQuestion);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get MostLikedPost", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /**
     *  All COMMENTS Methods
     * @param userName
     * @return
     */

    @GetMapping("/allCommentsByUser")
    public ResponseEntity<Object> getAllCommentsByUserByUser(@RequestParam String userName) {
        try {
            if (!userServiceImpl.userExists(userName)) {
                return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "no such user found");
            }
            List<Comment> allCommentsByUser = commentServiceImpl.getAllCommentsByUser(userName);
            return ResponseHandler.generateResponse("List of all the Comments by user - " + userName, HttpStatus.OK, allCommentsByUser);
        }

        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get Comments by user - " + userName, HttpStatus.INTERNAL_SERVER_ERROR, e);
        }

    }

    @GetMapping("/allCommentsForPost")
    public ResponseEntity<Object> getAllCommentsForPost(@RequestParam Long postId) {
        try {
            if (!postServiceImpl.postExists(postId)) {
                return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "no such post found");
            }
            List<Comment> allCommentsByUser = commentServiceImpl.getAllCommentsForPost(postId);
            return ResponseHandler.generateResponse("List of all the Comments for Post - " + postId, HttpStatus.OK, allCommentsByUser);
        }

        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get Comments for Post - " + postId, HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @PostMapping("/createComment/{postId}")
    public ResponseEntity<Object> createComment(@RequestParam String userName, @PathVariable Long postId, @RequestParam String commentData) {
        Integer userId = userName.hashCode();

        if(!postServiceImpl.postExists(postId))
            return ResponseHandler.generateResponse("Invalid PostID, no such post exists", HttpStatus.BAD_REQUEST);

        try {
            if (!userServiceImpl.existsById(userId)) {
                userServiceImpl.createNewUser(userName);
            }
            Comment newComment = commentServiceImpl.createComment(userName, postId, commentData);
            return ResponseHandler.generateResponse("Comment made successfully", HttpStatus.OK, newComment);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to create comment", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }



    @DeleteMapping("/deleteComment/{commentId}")
    public ResponseEntity<Object> deleteComment(@PathVariable Long commentId) {
        try {
            if (!commentServiceImpl.commentExists((commentId)))
                return ResponseHandler.generateResponse("No such Comment exists", HttpStatus.BAD_REQUEST);

            commentServiceImpl.deleteComment(commentId);
            return ResponseHandler.generateResponse("Successfully Deleted Comment", HttpStatus.OK);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to delete Comment - " + commentId, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /**
     * All LIKES Methods
     * @param userName
     * @return
     */

    @GetMapping("/allLikesByUser")
    public ResponseEntity<Object> getAllLikesByUser(@RequestParam String userName) {
        try {
            if (!userServiceImpl.userExists(userName)) {
                return ResponseHandler.generateResponse("no such user found", HttpStatus.OK, new ArrayList<>());
            }

            List<Post> allPostsLikedByUser = likedServiceImpl.getAllLikesByUser(userName);
            return ResponseHandler.generateResponse("List of all the Posts liked by user - " + userName, HttpStatus.OK, allPostsLikedByUser);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get Posts liked by user - " + userName, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @PostMapping("/createLike/{postId}")
    public ResponseEntity<Object> createLike(@RequestBody String userName, @PathVariable Long postId) {
        if(!postServiceImpl.postExists(postId))
            return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "no such Post found");

        try {
            if (!userServiceImpl.userExists(userName)) {
                userServiceImpl.createNewUser(userName);
            }

            Liked newLiked = likedServiceImpl.createLike(userName, postId);

            return ResponseHandler.generateResponse("List of all Likes by user - " + userName, HttpStatus.OK, newLiked);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to get likes of user - " + userName, HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @GetMapping("/getLikes")
    public ResponseEntity<Object> getLikesForPost(@RequestParam Long postId) {
        try {
            if (!postServiceImpl.postExists((postId)))
                return ResponseHandler.generateResponse("No such post exists", HttpStatus.BAD_REQUEST);

            int num = likedServiceImpl.getCountOfLikesForPost(postId);
            return ResponseHandler.generateResponse("Successfully retrieved number of likes for Post", HttpStatus.OK, num);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to retrieve number of likes for Post", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @PutMapping("/updateComment/{commentId}")
    public ResponseEntity<Object> updateComment(@PathVariable Long commentId, @RequestBody String commentBody) {
        try {
            if (!commentServiceImpl.commentExists((commentId)))
                return ResponseHandler.generateResponse("No such post exists", HttpStatus.BAD_REQUEST);

            Comment comment = commentServiceImpl.updateComment(commentId, commentBody);
            return ResponseHandler.generateResponse("Successfully updated Comment - " + commentId, HttpStatus.OK, comment);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse("Unable to update Comment", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
