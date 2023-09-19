package com.collpoll.feedApplication.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter @NoArgsConstructor @AllArgsConstructor
public class OptionSelect {

    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @EmbeddedId
    private OptionSelectPrimaryKey optionSelectPrimaryKey;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    @Column(nullable = false)
    private Long optionId;

    public OptionSelect(OptionSelectPrimaryKey optionSelectPrimaryKey, Long optionId) {
        this.optionSelectPrimaryKey = optionSelectPrimaryKey;
        this.optionId = optionId;
    }
}
