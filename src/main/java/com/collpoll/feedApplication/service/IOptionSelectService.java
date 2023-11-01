package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.OptionSelectPrimaryKey;

public interface IOptionSelectService {

    public Integer changeSelectedOption(OptionSelectPrimaryKey optionSelectPrimaryKey, Long optionId);

    Integer selectOption(OptionSelectPrimaryKey optionSelectPrimaryKey, Long optionId);

    void deleteOptionsSelectedOfPost(Long postId);
}
