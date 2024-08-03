package com.swlabs.omnipos.service.impl;

import com.swlabs.omnipos.entity.Item;
import com.swlabs.omnipos.entity.Order;
import com.swlabs.omnipos.entity.OrderDetail;
import com.swlabs.omnipos.entity._Table;
import com.swlabs.omnipos.repository.ItemRepository;
import com.swlabs.omnipos.repository.OrderDetailRepository;
import com.swlabs.omnipos.repository.OrderRepository;
import com.swlabs.omnipos.repository._TableRepository;
import com.swlabs.omnipos.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ItemRepository itemRepository;
    private final _TableRepository tableRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderDetailRepository orderDetailRepository,
                            ItemRepository itemRepository,
                            _TableRepository tableRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.itemRepository = itemRepository;
        this.tableRepository = tableRepository;
    }

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order findById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public Order save(Order entity) {
        _Table table = tableRepository.findById(entity.getTableId()).get();

        // Check if table is available - means is a new order
        if (table.getStatus().equals("Available")) {
            entity.setId(null);
            table.setStatus("Not available");
            tableRepository.save(table);
        } else {
            // Infer the table is not available
            List<String> orderFilters = Arrays.asList("Completed", "Cancelled");
            // A list of possible orders for the table
            List<Order> orders = orderRepository.findAllByTableIdAndStatusNotIn(entity.getTableId(), orderFilters);
            // Get the last (current / active) order
            Order order = orders.stream().max(Comparator.comparing(Order::getId)).get();

            entity.setId(order.getId());
            entity.setStartOrderDate(order.getStartOrderDate());
            entity.setEndOrderDate(order.getEndOrderDate());

            // Get all the order details for the last order
            OrderDetail detail = orderDetailRepository.findAllByOrderIdIn(Arrays.asList(order.getId()))
                    .stream()
                    .max(Comparator.comparing(OrderDetail::getId))
                    .stream().findFirst().get();

            // Set the order sequence for the new order
            entity.getOrderDetails().forEach(orderDetail -> {
                orderDetail.setOrderSequence(detail.getOrderSequence() + 1);
            });
        }

        // Set start order date if is a new order
        if(entity.getId() == null) {
            LocalDateTime localDateTime = LocalDateTime.now().atZone(ZoneId.of("America/Mexico_City")).toLocalDateTime();
            entity.setStartOrderDate(localDateTime);
            entity.setStatus("Pending");
        }
        Order orderCreated = orderRepository.save(entity);

        // Save order details
        entity.getOrderDetails().forEach(orderDetail -> {
            orderDetail.setOrderId(orderCreated.getId());
            OrderDetail detail = new OrderDetail(orderDetail);
            orderDetailRepository.save(detail);
        });

        return orderCreated;
    }

    @Override
    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public HashMap<Object, Object> findAllByStatus(String status) {
        // Find all orders by status
        List<Order> allByStatus = orderRepository.findAllByStatus(status);

        // Find all order details by order id
        List<OrderDetail> orderDetails = orderDetailRepository
                .findAllByOrderIdIn(allByStatus.stream()
                        .map(Order::getId)
                        .collect(Collectors.toList())
                );

        List<OrderDetail> result = new ArrayList<>(orderDetails);

        // Get item name for each row in order details
        result.forEach(orderDetail -> {
            Item item = itemRepository.findById(orderDetail.getItemId()).get();
            orderDetail.setItemName(item.getName());
        });

        HashMap<Object, Object> map = new HashMap<>();
        map.put("pendingOrders", allByStatus);
        map.put("orderDetails", result);

        return map;
    }

    @Transactional
    @Override
    public void checkout(Long tableId) {
        // Get the last order for the table
        List<String> orderFilters = Arrays.asList("Completed", "Cancelled");
        Order order = orderRepository.findAllByTableIdAndStatusNotIn(tableId, orderFilters)
                .stream()
                .max(Comparator.comparing(Order::getId))
                .stream().findFirst().get();
        // Set order status to completed
        order.setStatus("Completed");
        order.setEndOrderDate(LocalDateTime.now().atZone(ZoneId.of("America/Mexico_City")).toLocalDateTime());

        // calculate total for order
        List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderIdIn(Arrays.asList(order.getId()));

        Double reduce = orderDetails.stream().reduce(0.0, (subtotal, orderDetail) -> {
            subtotal += orderDetail.getSubtotal();
            return subtotal;
        }, Double::sum);

        order.setTotal(reduce);
        orderRepository.save(order);

        _Table table = tableRepository.findById(order.getTableId()).get();
        table.setStatus("Available");
        tableRepository.save(table);
    }

    @Override
    public void cancelOrder(Long tableId) {
        // Get the last order for the table
        List<String> orderFilters = Arrays.asList("Completed", "Cancelled");
        Order order = orderRepository.findAllByTableIdAndStatusNotIn(tableId, orderFilters)
                .stream()
                .max(Comparator.comparing(Order::getId))
                .stream().findFirst().get();
        // Set order status to cancelled
        order.setStatus("Cancelled");
        order.setEndOrderDate(LocalDateTime.now().atZone(ZoneId.of("America/Mexico_City")).toLocalDateTime());
        orderRepository.save(order);

        _Table table = tableRepository.findById(order.getTableId()).get();
        table.setStatus("Available");
        tableRepository.save(table);
    }
}
