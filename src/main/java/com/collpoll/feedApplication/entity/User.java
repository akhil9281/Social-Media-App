package com.collpoll.feedApplication.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id
    private Integer userId;

    @Column(nullable = false, updatable = false)
    private String userName;

    public User (String userName) {
        this.userName = userName;
        this.userId = this.userName.hashCode();
    }
}
