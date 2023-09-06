package com.collpoll.feedApplication.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false, updatable = false)
    private Long postId;

    private String body;

    private Integer selectCount;

    public Option(Long postId, String body) {
        this.postId = postId;
        this.body = body;
        this.selectCount = 0;
    }
}
