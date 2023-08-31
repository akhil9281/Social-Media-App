package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.Comment;
import com.collpoll.feedApplication.repository.CommentRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service @Transactional
public class CommentService {

    final CommentRepo commentRepo;

    public CommentService( CommentRepo commentRepo) {
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

    public void deleteCommentsOfPost(Long postId) {
        List<Comment> commentList = commentRepo.findAllByPostIdOrderByCreatedAt(postId);

        for (Comment comment: commentList) {
            commentRepo.deleteById((comment.getId()));
        }
    }

    public Integer getCountOfCommentsForPost(Long postId) {
        int count = commentRepo.countCommentsByPostId(postId);
        return count;
    }
}
