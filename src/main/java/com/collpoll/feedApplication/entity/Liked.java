package com.collpoll.feedApplication.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Liked {

    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @EmbeddedId
    private LikedPrimaryKey likedPrimaryKey;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    public Liked(LikedPrimaryKey likedPrimaryKey) {
        this.likedPrimaryKey = likedPrimaryKey;
    }
}
