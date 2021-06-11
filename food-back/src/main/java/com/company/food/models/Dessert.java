package com.company.food.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Table(name = "desserts")
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Dessert {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private int price;

    @Column(name = "picture")
    private String picURL;

    @ManyToOne(fetch = FetchType.EAGER)
    private Cafe cafe;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;
}
