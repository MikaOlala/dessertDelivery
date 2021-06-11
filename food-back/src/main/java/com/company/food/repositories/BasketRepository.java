package com.company.food.repositories;

import com.company.food.models.Basket;
import com.company.food.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
    List<Basket> findAllByUser(Users user);
}
