package com.wms.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "categories")
@Data
public class Category {
    @Id
    private UUID id;
    private String name;
}