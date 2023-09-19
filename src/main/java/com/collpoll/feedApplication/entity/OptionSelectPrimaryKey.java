package com.collpoll.feedApplication.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @EqualsAndHashCode
public class OptionSelectPrimaryKey implements Serializable {

    private Long postId;

    private Integer userId;
}
