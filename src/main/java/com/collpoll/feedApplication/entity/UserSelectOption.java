package com.collpoll.feedApplication.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter @NoArgsConstructor @AllArgsConstructor
public class UserSelectOption {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false, updatable = false)
    private Integer userId;

    @Column(nullable = false)
    private Long optionId;

    public UserSelectOption(Integer userId, Long optionId) {
        this.userId = userId;
        this.optionId = optionId;
    }
}
