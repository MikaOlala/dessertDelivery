package com.company.food.services;

import com.company.food.models.Cafe;
import com.company.food.models.Category;
import com.company.food.models.Dessert;
import com.company.food.models.Users;

import java.util.List;

public interface CafeService {
    List<Cafe> getAllCafes();
    List<Cafe> getAllCafesByName(String name);
    Cafe getCafe(Long id);
    Cafe getCafeByName(String name);
    Cafe getCafeByUser(Users user);
    Cafe addCafe(Cafe cafe);
    Cafe editCafe(Cafe cafe);
    void deleteCafe(Cafe cafe);

    List<Category> getAllCategories();
    Category getCategoryByName(String label);
    Category addCategory(Category category);

    List<Dessert> getAllDesserts();
    List<Dessert> getAllDessertsCafe(String name);
    List<Dessert> getAllDessertsByName(String name);
    Dessert getDessert(Long id);
    Dessert addDessert(Dessert dessert);

}
