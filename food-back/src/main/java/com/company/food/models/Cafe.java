package com.company.food.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Table(name = "cafes")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Cafe {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "board")
    private String board;

    @ManyToOne(fetch = FetchType.EAGER)
    private Users user;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Category> categories;
}
