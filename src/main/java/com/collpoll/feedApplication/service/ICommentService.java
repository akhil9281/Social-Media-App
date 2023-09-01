package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.Comment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @Transactional
public interface ICommentService {

    public Comment createComment(String userName, Long postId, String commentData);

    public List<Comment> getAllCommentsByUser(String userName);

    public List<Comment> getAllCommentsForPost(Long postId);

    public Comment updateComment(Long id, String newBody);

    public boolean commentExists(Long commentId);
    public void deleteComment(Long commentId);

    public void deleteCommentsOfPost(Long postId);
    public Integer getCountOfCommentsForPost(Long postId);
}
