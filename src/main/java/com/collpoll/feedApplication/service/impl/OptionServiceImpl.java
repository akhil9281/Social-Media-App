package com.collpoll.feedApplication.service.impl;

import com.collpoll.feedApplication.entity.PollOption;
import com.collpoll.feedApplication.repository.OptionRepo;
import com.collpoll.feedApplication.service.IOptionService;
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
    public List<PollOption> getOptionsForPost(Long postId) {
        return optionRepo.findAllByPostId(postId);
    }

    @Override
    public void addOptionToPost(Long postId, List<String> optionList) {
        for (String optionBody : optionList) {
            optionRepo.save(new PollOption(postId, optionBody));
        }
    }

    @Override
    public PollOption selectOption(Long optionId) {
        Optional<PollOption> option = optionRepo.findById(optionId);
        option.ifPresent(value -> value.setSelectCount(value.getSelectCount() + 1));
        return optionRepo.save(option.get());
    }

    @Override
    public PollOption deselectOption(Long optionId) {
        Optional<PollOption> option = optionRepo.findById(optionId);
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

    @Override
    public void deleteOptionsOfPost(Long postId) {
        if (optionRepo.countAllByPostId(postId) == 0)
            return;

        List<PollOption> optionList = optionRepo.findAllByPostId(postId);
        optionRepo.deleteAll(optionList);
    }

}
