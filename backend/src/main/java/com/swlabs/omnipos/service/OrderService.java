package com.swlabs.omnipos.service;

import com.swlabs.omnipos.entity.Order;

import java.util.HashMap;

public interface OrderService extends GenericCrud<Order> {

    HashMap<Object, Object> findAllByStatus(String status);

    void checkout(Long tableId);

    void cancelOrder(Long tableId);

}
