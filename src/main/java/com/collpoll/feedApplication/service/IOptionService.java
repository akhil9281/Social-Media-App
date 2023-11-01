package com.collpoll.feedApplication.service;

import com.collpoll.feedApplication.entity.PollOption;

import java.util.List;

public interface IOptionService {

    public List<PollOption> getOptionsForPost(Long postId);

    public void addOptionToPost(Long postId, List<String> optionList);

    public PollOption selectOption(Long optionId);

    PollOption deselectOption(Long optionId);

    public Integer getOptionSelectCount(Long optionId);

    public boolean optionExists(Long optionId);

    void deleteOptionsOfPost(Long postId);

}
