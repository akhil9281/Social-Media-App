package com.collpoll.feedApplication.service.impl;

import com.collpoll.feedApplication.entity.Option;
import com.collpoll.feedApplication.repository.OptionRepo;
import com.collpoll.feedApplication.service.IOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service @Transactional
public class OptionServiceImpl implements IOptionService {
    
    final OptionRepo optionRepo;

    public OptionServiceImpl(OptionRepo optionRepo) {
        this.optionRepo = optionRepo;
    }

    @Override
    public List<Option> getOptionsForPost(Long postId) {
        return optionRepo.findAllByPostId(postId);
    }

    @Override
    public void addOptionToPost(Long postId, List<String> optionList) {
        for (String optionBody : optionList) {
            optionRepo.save(new Option(postId, optionBody));
        }
    }

    @Override
    public Option selectOption(Long optionId) {
        Optional<Option> option = optionRepo.findById(optionId);
        option.ifPresent(value -> value.setSelectCount(value.getSelectCount() + 1));
        return optionRepo.save(option.get());
    }

    @Override
    public Option deselectOption(Long optionId) {
        Optional<Option> option = optionRepo.findById(optionId);
        option.ifPresent(value -> value.setSelectCount(value.getSelectCount() -1));
        return optionRepo.save(option.get());
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
