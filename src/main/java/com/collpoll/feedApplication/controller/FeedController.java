package com.collpoll.feedApplication.controller;

import com.collpoll.feedApplication.DTO.QuestionRequest;
import com.collpoll.feedApplication.Handler.ErrorMessage;
import com.collpoll.feedApplication.Handler.ResponseHandler;
import com.collpoll.feedApplication.entity.*;
import com.collpoll.feedApplication.service.impl.*;
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

    final OptionServiceImpl optionService;

    public FeedController(PostServiceImpl postServiceImpl, LikedServiceImpl likedServiceImpl, UserServiceImpl userServiceImpl,
                          CommentServiceImpl commentServiceImpl, OptionServiceImpl optionService) {
        this.postServiceImpl = postServiceImpl;
        this.likedServiceImpl = likedServiceImpl;
        this.userServiceImpl = userServiceImpl;
        this.commentServiceImpl = commentServiceImpl;
        this.optionService = optionService;
    }

    /**  POST Methods
     *
     *
     */

    @GetMapping("/allPosts")
    public ResponseEntity<Object> getAllPosts(@RequestParam Integer loadNumber) {
        if (loadNumber == null)
            loadNumber = 0;

        try {
            List<Post> allPostList = postServiceImpl.getFeed(loadNumber);
            return ResponseHandler.generateResponse("List of all the Posts in descending order by creation time", HttpStatus.OK, allPostList);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

    }

    @GetMapping("/allPostsByUser")
    public ResponseEntity<Object> getAllPostsByUser(@RequestParam String userName) {
        if(userName.isBlank())
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST, new ArrayList<Post>());

        try {
            if (!userServiceImpl.userExists(userName)) {
                return ResponseHandler.generateResponse("No such User found", HttpStatus.OK, new ArrayList<Post>());
            }
            List<Post> allPostsByUser = postServiceImpl.getAllPostsByUser(userName);
            return ResponseHandler.generateResponse("List of all the Posts by user - " + userName, HttpStatus.OK, allPostsByUser);
        }

        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @GetMapping("/allQuestionsByUser")
    public ResponseEntity<Object> getAllQuestionsByUser(@RequestParam String userName) {
        if(userName.isBlank())
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST, new ArrayList<Post>());

        try {
            if (!userServiceImpl.userExists(userName)) {
                return ResponseHandler.generateResponse("No such User found", HttpStatus.OK, new ArrayList<Post>());
            }
            List<Post> allPostsByUser = postServiceImpl.getAllQuestionsByUser(userName);
            return ResponseHandler.generateResponse("List of all the Questions by user - " + userName, HttpStatus.OK, allPostsByUser);
        }

        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @PostMapping("/createPost")
    public ResponseEntity<Object> createPost(@RequestParam String userName, @RequestParam PostType postType, @RequestParam String postData) {
        if (userName.isBlank() || postType == null || postData.isBlank())
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

        try {
            Post newPost = postServiceImpl.createPost(userName, postType, postData);
            return ResponseHandler.generateResponse("Post created successfully", HttpStatus.OK, newPost);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @PostMapping("/createQues")
    public ResponseEntity<Object> createQuestion(@RequestBody QuestionRequest questionRequest) {
        PostType postType = PostType.Question;
        if (questionRequest.getCreatedBy().isBlank() || questionRequest.getQuesBody().isBlank())
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

        /*if (questionRequest.getOptionsList().isEmpty())
            this.createPost(questionRequest.getCreatedBy(), postType, questionRequest.getQuesBody());*/

        try  {
            Post newQuestion = postServiceImpl.createPost(questionRequest.getCreatedBy(), postType, questionRequest.getQuesBody());
            optionService.addOptionToPost(newQuestion.getId(), questionRequest.getOptionsList());
            return ResponseHandler.generateResponse("Successfully created Question with Options - " + newQuestion.getId(), HttpStatus.OK);

        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @DeleteMapping("/deletePost")
    public ResponseEntity<Object> deletePost(@RequestParam Long postId) {
        if (postId == null)
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

        try {
            if (!postServiceImpl.postExists((postId)))
                return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

            likedServiceImpl.deleteLikesOfPost(postId);
            commentServiceImpl.deleteCommentsOfPost(postId);
            postServiceImpl.deletePost(postId);

            return ResponseHandler.generateResponse("Successfully Deleted Post", HttpStatus.OK);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, (Object[]) e.getStackTrace());
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
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
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
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    /**
     *  All OPTIONS Methods
     *
     */

    @GetMapping("/allOptionsForQues")
    public ResponseEntity<Object> getAllOptionsForQuestion(@RequestParam Long questionId) {
        if (questionId == null)
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

        try {
            List<Option> optionList = optionService.getOptionsForPost(questionId);
            return ResponseHandler.generateResponse("Successfully retrieved Options for Question - " + questionId, HttpStatus.OK, optionList);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/optionSelect/{optionId}")
    public ResponseEntity<Object> selectOption(@PathVariable Long optionId) {
        if (optionId == null)
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

        try {
           if(!optionService.optionExists(optionId))
               return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

           Option option = optionService.selectOption(optionId);
           return ResponseHandler.generateResponse("Successfully selected Option - " + optionId, HttpStatus.OK, option);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /**
     *  All COMMENTS Methods
     *
     */

    @GetMapping("/allCommentsByUser")
    public ResponseEntity<Object> getAllCommentsByUserByUser(@RequestParam String userName) {
        if (userName.isBlank())
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST, new ArrayList<Post>());

        try {
            if (!userServiceImpl.userExists(userName)) {
                return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "no such user found");
            }
            List<Comment> allCommentsByUser = commentServiceImpl.getAllCommentsByUser(userName);
            return ResponseHandler.generateResponse("List of all the Comments by user - " + userName, HttpStatus.OK, allCommentsByUser);
        }

        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }

    }

    @GetMapping("/allCommentsForPost")
    public ResponseEntity<Object> getAllCommentsForPost(@RequestParam Long postId) {
        if (postId == null)
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

        try {
            if (!postServiceImpl.postExists(postId)) {
                return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);
            }
            List<Comment> allCommentsByUser = commentServiceImpl.getAllCommentsForPost(postId);
            Integer countOfComments = commentServiceImpl.getCountOfCommentsForPost(postId);
            return ResponseHandler.generateResponse("List of all the Comments for Post - " + postId, HttpStatus.OK, allCommentsByUser, countOfComments);
        }

        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @PostMapping("/createComment/{postId}")
    public ResponseEntity<Object> createComment(@RequestParam String userName, @PathVariable Long postId, @RequestParam String commentData) {
        if (userName.isBlank() || postId == null)
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

        try {
            if(!postServiceImpl.postExists(postId))
                return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

            if (!userServiceImpl.userExists(userName)) {
                userServiceImpl.createNewUser(userName);
            }
            Comment newComment = commentServiceImpl.createComment(userName, postId, commentData);
            return ResponseHandler.generateResponse("Comment made successfully", HttpStatus.OK, newComment);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }


    @DeleteMapping("/deleteComment/{commentId}")
    public ResponseEntity<Object> deleteComment(@PathVariable Long commentId) {
        if (commentId == null)
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

        try {
            if (!commentServiceImpl.commentExists((commentId)))
                return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

            commentServiceImpl.deleteComment(commentId);
            return ResponseHandler.generateResponse("Successfully Deleted Comment", HttpStatus.OK);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /**
     * All LIKES Methods
     *
     */

    @GetMapping("/allLikesByUser")
    public ResponseEntity<Object> getAllLikesByUser(@RequestParam String userName) {
        if(userName.isBlank())
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST, new ArrayList<Post>());

        try {
            if (!userServiceImpl.userExists(userName)) {
                return ResponseHandler.generateResponse("no such user found", HttpStatus.OK, new ArrayList<>());
            }

            List<Post> allPostsLikedByUser = likedServiceImpl.getAllLikesByUser(userName);
            return ResponseHandler.generateResponse("List of all the Posts liked by user - " + userName, HttpStatus.OK, allPostsLikedByUser);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @PostMapping("/createLike/{postId}")
    public ResponseEntity<Object> createLike(@RequestBody String userName, @PathVariable Long postId) {
        if (userName.isBlank() || postId == null)
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

        try {
            if(!postServiceImpl.postExists(postId))
                return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST, "no such Post found");

            if (!userServiceImpl.userExists(userName)) {
                userServiceImpl.createNewUser(userName);
            }

            Liked newLiked = likedServiceImpl.createLike(userName, postId);

            return ResponseHandler.generateResponse("List of all Likes by user - " + userName, HttpStatus.OK, newLiked);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @GetMapping("/getLikes")
    public ResponseEntity<Object> getLikesForPost(@RequestParam Long postId) {
        if (postId == null)
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

        try {
            if (!postServiceImpl.postExists((postId)))
                return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST, "No such post exists");

            int num = likedServiceImpl.getCountOfLikesForPost(postId);
            return ResponseHandler.generateResponse("Successfully retrieved number of likes for Post", HttpStatus.OK, num);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }

    @PutMapping("/updateComment/{commentId}")
    public ResponseEntity<Object> updateComment(@PathVariable Long commentId, @RequestBody String commentBody) {
        if (commentId == null || commentBody.isBlank())
            return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST, new ArrayList<Post>());

        try {
            if (!commentServiceImpl.commentExists((commentId)))
                return ResponseHandler.generateResponse(ErrorMessage.Error400.toString(), HttpStatus.BAD_REQUEST);

            Comment comment = commentServiceImpl.updateComment(commentId, commentBody);
            return ResponseHandler.generateResponse("Successfully updated Comment - " + commentId, HttpStatus.OK, comment);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(ErrorMessage.Error500.toString(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
