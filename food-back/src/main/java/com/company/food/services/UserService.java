package com.company.food.services;

import com.company.food.models.Basket;
import com.company.food.models.Role;
import com.company.food.models.Users;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    Users getUser(Long id);
    Users addUser(Users user);
    Users getUserByTelephone(String telephone);

    List<Basket> getAllFromBasket(Users user);
    Basket getBasket(Long id);
    Basket addBasket(Basket basket);
    Basket editBasket(Basket basket);
    void deleteBasket(Basket basket);

    Role getRoleByRole(String role);
}
