package com.swlabs.omnipos.repository;

import com.swlabs.omnipos.entity.Item;
import com.swlabs.omnipos.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
