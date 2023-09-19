package com.collpoll.feedApplication.DTO;

import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class OptionSelectRequest {

    private Long postId;

    private Integer userId;

    private Long optionId;
}
