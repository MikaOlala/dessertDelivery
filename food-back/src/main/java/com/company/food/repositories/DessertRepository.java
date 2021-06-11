package com.company.food.repositories;

import com.company.food.models.Dessert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public interface DessertRepository extends JpaRepository<Dessert, Long> {
    List<Dessert> getDessertsByCafeName(String name);
    List<Dessert> getDessertsByNameLike(String name);
}
