package com.swlabs.omnipos.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long tableId;
    private LocalDateTime startOrderDate;
    private LocalDateTime endOrderDate;
    private String paymentMethod;
    private String paymentNote;
    private Double total;
    private String status;
    @Transient
    private List<OrderDetailDTO> orderDetails;

    public Order() {
        orderDetails = new ArrayList<>();
    }
}
