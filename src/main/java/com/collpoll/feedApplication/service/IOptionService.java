package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.Option;

import java.util.List;

public interface IOptionService {

    public List<Option> getOptionsForPost(Long postId);

    public void addOptionToPost(Long postId, List<String> optionList);

    public Option selectOption(Long optionId);

    public Integer getOptionSelectCount(Long optionId);

    public boolean optionExists(Long optionId);
}
