package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.Liked;
import com.collpoll.feedApplication.entity.LikedPrimaryKey;
import com.collpoll.feedApplication.entity.Post;
import com.collpoll.feedApplication.repository.LikedRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LikedService {

    final PostService postService;

    final LikedRepo likedRepo;

    public LikedService(PostService postService, LikedRepo likedRepo) {
        this.postService = postService;
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
            Optional<Post> post = postService.getPost(like.getLikedPrimaryKey().getPostId());
            post.ifPresent(allPostsLikedByUser::add);
        }
        return allPostsLikedByUser;
    }

    public Integer getCountOfLikesForPost(Long postId) {
        return likedRepo.countLikedByLikedPrimaryKey_PostId(postId);
    }

    public void deleteLikesOfPost(Long postId) {
        List<Liked> likedList = likedRepo.findAllByLikedPrimaryKeyPostId(postId);
        for (Liked like: likedList)
            likedRepo.deleteById(like.getId());
    }
}
