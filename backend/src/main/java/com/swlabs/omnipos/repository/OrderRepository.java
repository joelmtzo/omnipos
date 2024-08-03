package com.swlabs.omnipos.repository;

import com.swlabs.omnipos.entity.Item;
import com.swlabs.omnipos.entity.Order;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.lang.annotation.Native;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByStatus(String status);
    List<Order> findAllByTableIdAndStatusNotIn(Long tableId, List<String> status);

}
