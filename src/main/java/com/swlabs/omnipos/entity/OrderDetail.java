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
    private Integer quantity;
    private Double price;
    private Double subtotal;
    private Integer orderSequence;
    private String note;

    public Double getSubtotal() {
        return price * quantity;
    }
}
