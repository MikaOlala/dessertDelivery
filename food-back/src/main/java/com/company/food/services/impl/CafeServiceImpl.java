package com.company.food.services.impl;

import com.company.food.models.Cafe;
import com.company.food.models.Category;
import com.company.food.models.Dessert;
import com.company.food.models.Users;
import com.company.food.repositories.CafeRepository;
import com.company.food.repositories.CategoryRepository;
import com.company.food.repositories.DessertRepository;
import com.company.food.services.CafeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CafeServiceImpl implements CafeService {
    @Autowired
    private CafeRepository cafeRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private DessertRepository dessertRepository;

    @Override
    public List<Cafe> getAllCafes() {
        return cafeRepository.findAll();
    }

    @Override
    public List<Cafe> getAllCafesByName(String name) {
        return cafeRepository.getCafesByNameLike(name);
    }

    @Override
    public Cafe getCafe(Long id) {
        return cafeRepository.getOne(id);
    }

    @Override
    public Cafe getCafeByName(String name) {
        return cafeRepository.findByName(name);
    }

    @Override
    public Cafe getCafeByUser(Users user) {
        return cafeRepository.findByUser(user);
    }

    @Override
    public Cafe addCafe(Cafe cafe) {
        return cafeRepository.save(cafe);
    }

    @Override
    public Cafe editCafe(Cafe cafe) {
        return cafeRepository.save(cafe);
    }

    @Override
    public void deleteCafe(Cafe cafe) {
        cafeRepository.delete(cafe);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryByName(String label) {
        return categoryRepository.findByLabel(label);
    }

    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<Dessert> getAllDesserts() {
        return dessertRepository.findAll();
    }

    @Override
    public List<Dessert> getAllDessertsCafe(String name) {
        return dessertRepository.getDessertsByCafeName(name);
    }

    @Override
    public List<Dessert> getAllDessertsByName(String name) {
        return dessertRepository.getDessertsByNameLike(name);
    }

    @Override
    public Dessert getDessert(Long id) {
        return dessertRepository.getOne(id);
    }

    @Override
    public Dessert addDessert(Dessert dessert) {
        return dessertRepository.save(dessert);
    }
}
