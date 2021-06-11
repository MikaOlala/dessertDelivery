package com.company.food.repositories;

import com.company.food.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByTelephone(String telephone);
}
