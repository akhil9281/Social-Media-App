package com.collpoll.feedApplication.repository;

import com.collpoll.feedApplication.entity.OptionSelect;
import com.collpoll.feedApplication.entity.OptionSelectPrimaryKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OptionSelectRepo extends JpaRepository<OptionSelect, Long> {
    @Query("select o from OptionSelect o where o.optionSelectPrimaryKey.postId = ?1")
    List<OptionSelect> findAllByOptionSelectPrimaryKey_PostId(Long postId);

    public OptionSelect findByOptionSelectPrimaryKey(OptionSelectPrimaryKey optionSelectPrimaryKey);

    public boolean existsByOptionSelectPrimaryKey(OptionSelectPrimaryKey optionSelectPrimaryKey);

    public int countAllByOptionSelectPrimaryKey_PostId(Long postId);
}
