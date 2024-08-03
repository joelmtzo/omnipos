package com.swlabs.omnipos.repository;

import com.swlabs.omnipos.entity.Category;
import com.swlabs.omnipos.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByCategoryId(Long categoryId);

}
