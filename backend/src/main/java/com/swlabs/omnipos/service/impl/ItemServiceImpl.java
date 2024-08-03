package com.swlabs.omnipos.service.impl;

import com.swlabs.omnipos.entity.Item;
import com.swlabs.omnipos.repository.ItemRepository;
import com.swlabs.omnipos.service.ItemService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    @Override
    public Item findById(Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    @Override
    public Item save(Item entity) {
        return itemRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        itemRepository.deleteById(id);
    }

    @Override
    public List<Item> findAllByCategory(Long categoryId) {
        return itemRepository.findByCategoryId(categoryId);
    }
}
