package com.collpoll.feedApplication.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Post {

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    */
    @Column(nullable = false, updatable = false)
    private Integer createdById; //userId

    @Column(nullable = false, updatable = false)
    private String createdBy;

    private String body;

    @Enumerated(value = EnumType.STRING)
    private PostType type;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    public Post(String createdBy, Integer createdById, PostType type, String body) {
        this.createdById = createdById;
        this.body = body;
        this.type = type;
        this.createdBy = createdBy;
    }

}
