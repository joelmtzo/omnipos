package com.swlabs.omnipos.service;

import com.swlabs.omnipos.entity.Item;

import java.util.List;

public interface ItemService extends GenericCrud<Item> {
    List<Item> findAllByCategory(Long categoryId);
}
