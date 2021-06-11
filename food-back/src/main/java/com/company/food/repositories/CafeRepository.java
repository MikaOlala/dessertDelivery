package com.company.food.repositories;

import com.company.food.models.Cafe;
import com.company.food.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface CafeRepository extends JpaRepository<Cafe, Long> {
    Cafe findByName(String name);
    Cafe findByUser(Users user);
    List<Cafe> getCafesByNameLike(String name);
}
