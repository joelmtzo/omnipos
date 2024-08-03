package com.swlabs.omnipos.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class OrderDetailDTO {
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
