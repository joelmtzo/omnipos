package com.swlabs.omnipos.repository;

import com.swlabs.omnipos.entity.Order;
import com.swlabs.omnipos.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    List<OrderDetail> findAllByOrderIdIn(List<Long> orderIds);

}
