package com.swlabs.omnipos.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "order_details")
@Getter
@Setter
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long orderId;
    private Long itemId;
    @Transient
    private String itemName;
    private Integer quantity;
    private Double price;
    @Transient
    private Double subtotal;
    private Integer orderSequence;
    private String note;

    public OrderDetail(OrderDetailDTO orderDetailDTO) {
        this.orderId = orderDetailDTO.getOrderId();
        this.itemId = orderDetailDTO.getItemId();
        this.quantity = orderDetailDTO.getQuantity();
        this.price = orderDetailDTO.getPrice();
        this.orderSequence = orderDetailDTO.getOrderSequence();
        this.note = orderDetailDTO.getNote();
    }

    public OrderDetail() {

    }

    public Double getSubtotal() {
        return price * quantity;
    }
}
