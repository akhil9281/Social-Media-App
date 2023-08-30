package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.Handler.ResponseHandler;
import com.collpoll.feedApplication.entity.Comment;
import com.collpoll.feedApplication.entity.Post;
import com.collpoll.feedApplication.repository.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;

@Service @Transactional
public class CommentService {

    @Autowired
    UserService userService;

    @Autowired
    PostService postService;

    @Autowired
    CommentRepo commentRepo;

    public ResponseEntity<Object> createComment(String userName, Long postId, String commentData) {
        Integer userId = userName.hashCode();

        if(!postService.postExists(postId))
            return ResponseHandler.generateResponse("Invalid PostID, no such post exists", HttpStatus.BAD_REQUEST,
                    null);

        try {
            if (!userService.existsById(userId)) {
                userService.createNewUser(userName);
            }

            Comment newComment = new Comment(postId, commentData, userName, userName.hashCode());
            commentRepo.save(newComment);

            return ResponseHandler.generateResponse("Comment made successfully", HttpStatus.CREATED, newComment);
        }
        catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    public List<Comment> getAllCommentsByUser(String userName) {
        Integer userId = userName.hashCode();

        List<Comment> allComments = commentRepo.findAllByCreatedByIdOrderByCreatedAt(userId);
        return allComments;


    }

    public List<Comment> getAllCommentsForPost(Long postId) {
        return commentRepo.findAllByPostIdOrderByCreatedAt(postId);
    }

    public Comment updateComment(Long id, String newBody) {
        Comment newComment = null;

        Optional<Comment> comment = commentRepo.findById(id);
        if (comment.isPresent())
            newComment = comment.get();
        assert newComment != null;
        newComment.setBody(newBody);

        return commentRepo.save(newComment);
    }

    public boolean commentExists(Long commentId) {
        return commentRepo.existsById(commentId)
    }
}
