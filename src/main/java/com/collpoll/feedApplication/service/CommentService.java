package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.Handler.ResponseHandler;
import com.collpoll.feedApplication.entity.Comment;
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

    final UserService userService;

    final PostService postService;

    final CommentRepo commentRepo;

    public CommentService(UserService userService, PostService postService, CommentRepo commentRepo) {
        this.userService = userService;
        this.postService = postService;
        this.commentRepo = commentRepo;
    }

    public Comment createComment(String userName, Long postId, String commentData) {
        Comment newComment = new Comment(postId, commentData, userName, userName.hashCode());
        return commentRepo.save(newComment);


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
        return commentRepo.existsById(commentId);
    }

    public void deleteComment(Long commentId) {
        commentRepo.deleteById(commentId);
    }
}
