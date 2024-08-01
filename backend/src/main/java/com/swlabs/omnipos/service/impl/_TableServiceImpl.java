package com.swlabs.omnipos.service.impl;

import com.swlabs.omnipos.entity._Table;
import com.swlabs.omnipos.repository._TableRepository;
import com.swlabs.omnipos.service._TableService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class _TableServiceImpl implements _TableService {

    private final _TableRepository tableRepository;

    public _TableServiceImpl(_TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    @Override
    public List<_Table> findAll() {
        return tableRepository.findAll();
    }

    @Override
    public _Table findById(Long id) {
        return tableRepository.findById(id).orElse(null);
    }

    @Override
    public _Table save(_Table entity) {
        return tableRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        tableRepository.deleteById(id);
    }
}
