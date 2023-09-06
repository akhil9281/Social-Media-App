package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.Option;

import java.util.List;

public interface IOptionService {

    public List<Option> getOptionsForPost(Long postId);

    public Option addOptionToPost(Long postId, String body);

    public void selectOption(Long optionId);

    public Integer getOptionSelectCount(Long optionId);

    public boolean optionExists(Long optionId);
}
