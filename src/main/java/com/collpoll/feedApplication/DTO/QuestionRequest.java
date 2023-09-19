package com.collpoll.feedApplication.DTO;

import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class QuestionRequest {

    private String createdBy;

    private String quesBody;

    private List<String> optionsList;
}
