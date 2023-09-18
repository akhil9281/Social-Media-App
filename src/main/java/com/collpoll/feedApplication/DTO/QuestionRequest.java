package com.collpoll.feedApplication.DTO;

import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class QuestionRequest {

    String createdBy;

    String quesBody;

    List<String> optionsList;
}
