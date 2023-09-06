package com.collpoll.feedApplication.service.impl;

import com.collpoll.feedApplication.entity.UserSelectOption;
import com.collpoll.feedApplication.repository.UserSelectOptionRepo;
import com.collpoll.feedApplication.service.IUserSelectOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserSelectUserImpl implements IUserSelectOption {

    @Autowired
    OptionServiceImpl optionService;

    @Autowired
    UserSelectOptionRepo userSelectOptionRepo;

    @Override
    public Integer selectOption(Long optionId, Integer userId) {
        UserSelectOption newUserSelectOption = new UserSelectOption(userId, optionId);
        userSelectOptionRepo.save(newUserSelectOption);
        optionService.selectOption(optionId);
        return optionService.getOptionSelectCount(optionId);
    }
}
