package com.collpoll.feedApplication.service.impl;

import com.collpoll.feedApplication.entity.OptionSelect;
import com.collpoll.feedApplication.entity.OptionSelectPrimaryKey;
import com.collpoll.feedApplication.repository.OptionSelectRepo;
import com.collpoll.feedApplication.service.IOptionSelectService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @Transactional
public class OptionSelectServiceImpl implements IOptionSelectService {

    final OptionServiceImpl optionService;

    final OptionSelectRepo optionSelectRepo;

    public OptionSelectServiceImpl(OptionServiceImpl optionService, OptionSelectRepo optionSelectRepo) {
        this.optionService = optionService;
        this.optionSelectRepo = optionSelectRepo;
    }

    public boolean userSelectionDone(OptionSelectPrimaryKey optionSelectPrimaryKey) {
        return optionSelectRepo.existsByOptionSelectPrimaryKey(optionSelectPrimaryKey);
    }

    @Override
    public Integer changeSelectedOption(OptionSelectPrimaryKey optionSelectPrimaryKey, Long optionId) {
        OptionSelect userSelection = optionSelectRepo.findByOptionSelectPrimaryKey(optionSelectPrimaryKey);
        optionService.deselectOption(userSelection.getOptionId());

        userSelection.setOptionId(optionId);

        optionSelectRepo.save(userSelection);
        optionService.selectOption(optionId);

        return optionService.getOptionSelectCount(optionId);
    }

    @Override
    public Integer selectOption(OptionSelectPrimaryKey optionSelectPrimaryKey, Long optionId) {
        OptionSelect newOptionSelect = new OptionSelect(optionSelectPrimaryKey, optionId);

        optionSelectRepo.save(newOptionSelect);
        optionService.selectOption(optionId);

        return optionService.getOptionSelectCount(optionId);
    }

    @Override
    public void deleteOptionsSelectedOfPost(Long postId) {
        if (optionSelectRepo.countAllByOptionSelectPrimaryKey_PostId(postId) == 0)
            return;

        List<OptionSelect> optionSelectList = optionSelectRepo.findAllByOptionSelectPrimaryKey_PostId(postId);
        optionSelectRepo.deleteAll(optionSelectList);
    }
}
