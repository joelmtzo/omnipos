package com.swlabs.omnipos.service;

import java.util.List;

public interface GenericCrud<T> {

        List<T> findAll();
        T findById(Long id);
        T save(T entity);
        void deleteById(Long id);
}
