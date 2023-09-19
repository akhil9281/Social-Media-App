package com.collpoll.feedApplication.repository;

import com.collpoll.feedApplication.entity.OptionSelect;
import com.collpoll.feedApplication.entity.OptionSelectPrimaryKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionSelectRepo extends JpaRepository<OptionSelect, Long> {

    public OptionSelect findByOptionSelectPrimaryKey(OptionSelectPrimaryKey optionSelectPrimaryKey);

    public boolean existsByOptionSelectPrimaryKey(OptionSelectPrimaryKey optionSelectPrimaryKey);
}
