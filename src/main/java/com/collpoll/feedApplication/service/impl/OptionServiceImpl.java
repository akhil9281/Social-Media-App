package com.collpoll.feedApplication.service.impl;

import com.collpoll.feedApplication.entity.Option;
import com.collpoll.feedApplication.repository.OptionRepo;
import com.collpoll.feedApplication.service.IOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OptionServiceImpl implements IOptionService {
    
    @Autowired
    OptionRepo optionRepo;
    
    @Override
    public List<Option> getOptionsForPost(Long postId) {
        return optionRepo.findAllByPostId(postId);
    }

    @Override
    public Option addOptionToPost(Long postId, String body) {
        Option newOption = new Option(postId, body);
        return optionRepo.save(newOption);
    }

    @Override
    public void selectOption(Long optionId) {
        Optional<Option> option = optionRepo.findById(optionId);
        option.ifPresent(value -> value.setSelectCount(value.getSelectCount() + 1));
    }

    @Override
    public Integer getOptionSelectCount(Long optionId) {
        return optionRepo.findById(optionId).get().getSelectCount();
    }

    @Override
    public boolean optionExists(Long optionId) {
        return optionRepo.existsById(optionId);
    }

}
