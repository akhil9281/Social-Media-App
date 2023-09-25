package com.collpoll.feedApplication.service.impl;

import com.collpoll.feedApplication.entity.Liked;
import com.collpoll.feedApplication.entity.LikedPrimaryKey;
import com.collpoll.feedApplication.entity.Post;
import com.collpoll.feedApplication.repository.LikedRepo;
import com.collpoll.feedApplication.service.ILikedService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LikedServiceImpl implements ILikedService {

    final PostServiceImpl postServiceImpl;

    final LikedRepo likedRepo;

    public LikedServiceImpl(PostServiceImpl postServiceImpl, LikedRepo likedRepo) {
        this.postServiceImpl = postServiceImpl;
        this.likedRepo = likedRepo;
    }

    public Liked createLike(String userName, Long postId) {
        Integer userId = userName.hashCode();
        LikedPrimaryKey newLikeKey = new LikedPrimaryKey(postId, userId);
        Liked newLiked = new Liked(newLikeKey);

        return likedRepo.save(newLiked);
    }

    public List<Post> getAllLikesByUser(String userName) {
        Integer userId = userName.hashCode();

        List<Liked> allLikes = likedRepo.findAllByLikedPrimaryKeyMadeByOrderByCreatedAt(userId);
        List<Post> allPostsLikedByUser = new ArrayList<>();

        for (Liked like : allLikes) {
            Optional<Post> post = postServiceImpl.getPost(like.getLikedPrimaryKey().getPostId());
            post.ifPresent(allPostsLikedByUser::add);
        }
        return allPostsLikedByUser;
    }

    public Integer getCountOfLikesForPost(Long postId) {
        return likedRepo.countLikedByLikedPrimaryKey_PostId(postId);
    }

    public void deleteLikesOfPost(Long postId) {
        if  (likedRepo.countLikedByLikedPrimaryKey_PostId(postId) == 0)
            return;

        List<Liked> likedList = likedRepo.findAllByLikedPrimaryKey_PostId(postId);
        likedRepo.deleteAll(likedList);
    }

    @Override
    public Boolean isLikedByUser(LikedPrimaryKey newKey) {
        return likedRepo.existsByLikedPrimaryKey(newKey);
    }
}
