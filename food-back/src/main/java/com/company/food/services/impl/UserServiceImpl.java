package com.company.food.services.impl;

import com.company.food.models.Basket;
import com.company.food.models.Role;
import com.company.food.models.Users;
import com.company.food.repositories.BasketRepository;
import com.company.food.repositories.RoleRepository;
import com.company.food.repositories.UserRepository;
import com.company.food.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private BasketRepository basketRepository;

    @Override
    public Users getUser(Long id) {
        Optional<Users> opt = userRepository.findById(id);
        return opt.isPresent()?opt.get():null;
    }

    @Override
    public Role getRoleByRole(String role) {
        return roleRepository.getRoleByRole(role);
    }

    @Override
    public Users addUser(Users user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Role role = getRoleByRole("client");
        user.setRole(role);
        return userRepository.save(user);
    }

    @Override
    public Users getUserByTelephone(String telephone) {
        return userRepository.findByTelephone(telephone);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Users user = userRepository.findByTelephone(s);
        if(user!=null) {
            return user;
        }
        else {
            throw new UsernameNotFoundException("USER NOT FOUND");
        }
    }

    @Override
    public List<Basket> getAllFromBasket(Users user) {
        return basketRepository.findAllByUser(user);
    }

    @Override
    public Basket getBasket(Long id) {
        return basketRepository.getOne(id);
    }

    @Override
    public Basket addBasket(Basket basket) {
        return basketRepository.save(basket);
    }

    @Override
    public Basket editBasket(Basket basket) {
        return basketRepository.save(basket);
    }

    @Override
    public void deleteBasket(Basket basket) {
        basketRepository.delete(basket);
    }
}
