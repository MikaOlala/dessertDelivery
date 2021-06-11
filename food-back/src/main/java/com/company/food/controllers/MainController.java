package com.company.food.controllers;

import com.company.food.models.*;
import com.company.food.services.CafeService;
import com.company.food.services.UserService;
import com.fasterxml.jackson.databind.DeserializationConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

class CafePageFilter {
    public Long id;
    public String name;
    public String board;

    public CafePageFilter(Long id, String name, String board) {
        this.id = id;
        this.name = name;
        this.board = board;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBoard() {
        return board;
    }

    public void setBoard(String board) {
        this.board = board;
    }
}

class CafeFilter {
    public Long id;
    public String name;
    public String moderator;
    public String moderatorPhone;

    public CafeFilter() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getModerator() {
        return moderator;
    }

    public String getModeratorPhone() {
        return moderatorPhone;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setModerator(String moderator) {
        this.moderator = moderator;
    }

    public void setModeratorPhone(String moderatorPhone) {
        this.moderatorPhone = moderatorPhone;
    }
}

class DessertFilter {
    public Long id;
    public String name;
    public String description;
    public int price;
    public String url;
    public String category;

    public DessertFilter(Long id, String name, String description, int price, String url, String category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.url = url;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getPrice() {
        return price;
    }

    public String getUrl() {
        return url;
    }

    public String getCategory() {
        return category;
    }
}

class BasketFilter {
    public Long id;
    public int quantity;
    public String name;
    public String url;
    public int price;

    public BasketFilter(Long id, int quantity, String name, String url, int price) {
        this.id = id;
        this.quantity = quantity;
        this.name = name;
        this.url = url;
        this.price = price;
    }
}

class PlusMinusFilter {
    public Long id;
    public String act;

    public Long getId() {
        return id;
    }

    public String getAct() {
        return act;
    }
}

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class MainController {
    @Autowired
    private CafeService cafeService;

    @Autowired
    private UserService userService;


    @GetMapping(value = "/cafes")
    public ResponseEntity<?> getAllCafes() {
        List<Cafe> cafesOriginal = cafeService.getAllCafes();
        List<CafeFilter> cafes = new ArrayList<>();
        for(Cafe c : cafesOriginal) {
            CafeFilter cf = new CafeFilter();
            cf.setId(c.getId());
            cf.setName(c.getName());
            if(c.getUser()==null) {
                cf.setModerator("");
                cf.setModeratorPhone("");
            }
            else {
                cf.setModerator(c.getUser().getName());
                cf.setModeratorPhone(c.getUser().getTelephone());
            }
            cafes.add(cf);
        }
        return new ResponseEntity<>(cafes, HttpStatus.OK);
    }

    @PostMapping(value = "/addCafe")
    public ResponseEntity<?> addCafe(@RequestBody String newCafe) {
        Cafe cafe = new Cafe();
        cafe.setName(newCafe);
        cafeService.addCafe(cafe);
        return ResponseEntity.ok(cafe);
    }
    @PostMapping(value = "/editCafe")
    public ResponseEntity<?> editCafe(@RequestBody CafeFilter cafeFilter) {
        Cafe cafe = cafeService.getCafe(cafeFilter.getId());
        Users user = userService.getUserByTelephone(cafeFilter.getModeratorPhone());
        if(user.getRole().getId()!=2) {
            Role role = userService.getRoleByRole("moderator");
            user.setRole(role);

            cafe.setName(cafeFilter.getName());
            cafe.setUser(user);

            cafeService.editCafe(cafe);
            return ResponseEntity.ok(cafe);
        }
        else
            return (ResponseEntity<?>) ResponseEntity.status(409);
    }

    @GetMapping(value = "/cafe")
    public ResponseEntity<?> getCafe() {
        Users user = getUser();
        Cafe cafe = cafeService.getCafeByUser(user);
        CafePageFilter cpf = new CafePageFilter(cafe.getId(), cafe.getName(), cafe.getBoard());

        return new ResponseEntity<>(cpf, HttpStatus.OK);
    }
    @GetMapping(value = "/cafe/{cafe}")
    public ResponseEntity<?> getCafe(@PathVariable(name = "cafe") String name) {
        Cafe cafe = cafeService.getCafeByName(name);
        CafePageFilter cpf = new CafePageFilter(cafe.getId(), cafe.getName(), cafe.getBoard());

        return new ResponseEntity<>(cpf, HttpStatus.OK);
    }

    @PostMapping(value = "/editBoard")
    public ResponseEntity<?> editBoard(@RequestBody CafePageFilter cafePageFilter) {
        Cafe cafe = cafeService.getCafe(cafePageFilter.getId());
        cafe.setBoard(cafePageFilter.getBoard());
        cafeService.editCafe(cafe);
        return ResponseEntity.ok(cafe);
    }
    @GetMapping(value = "/categories")
    public ResponseEntity<?> getCategories() {
        List<Category> categories = cafeService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping(value = "/allDesserts")
    public ResponseEntity<?> getAllDesserts() {
        List<Dessert> desserts = cafeService.getAllDesserts();
        return new ResponseEntity<>(desserts, HttpStatus.OK);
    }

    @GetMapping(value = "/search")
    public ResponseEntity<?> getAllBySearch(@RequestParam(name = "name") String name) {
        List<Dessert> desserts = cafeService.getAllDessertsByName('%' + name + '%');
        return new ResponseEntity<>(desserts, HttpStatus.OK);
    }

    @GetMapping(value = "/searchCafe")
    public ResponseEntity<?> getAllCafesBySearch(@RequestParam(name = "name") String name) {
        List<Cafe> cafes = cafeService.getAllCafesByName('%' + name + '%');
        return new ResponseEntity<>(cafes, HttpStatus.OK);
    }

    @GetMapping(value = "/allCategoriesCafe")
    public ResponseEntity<?> getAllCategoriesCafe() {
        Users user = getUser();
        Cafe cafe = cafeService.getCafeByUser(user);
        List<Category> categories = cafe.getCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping(value = "/allCategoriesCafePath/{cafe}")
    public ResponseEntity<?> getAllCategoriesCafe(@PathVariable(name = "cafe") String name) {
        Cafe cafe = cafeService.getCafeByName(name);
        List<Category> categories = cafe.getCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping(value = "/allDessertsByCafe/{cafe}")
    public ResponseEntity<?> getDessertsbyCafe(@PathVariable(name = "cafe") String name) {
        System.out.println("variable - " + name);
        List<Dessert> desserts = cafeService.getAllDessertsCafe(name);
        List<DessertFilter> desserts2 = new ArrayList<>();
        for(Dessert d : desserts) {
            desserts2.add(new DessertFilter(d.getId(), d.getName(), d.getDescription(), d.getPrice(), d.getPicURL(), d.getCategory().getLabel()));
        }
        System.out.println(desserts);
        return new ResponseEntity<>(desserts2, HttpStatus.OK);
    }

    @PostMapping(value = "/addDessert")
    public ResponseEntity<?> addDessert(@RequestBody DessertFilter dessertFilter) {
        Users user = getUser();
        Cafe cafe = cafeService.getCafeByUser(user);
        Category category = cafeService.getCategoryByName(dessertFilter.getCategory());
        Dessert dessert = new Dessert();
        dessert.setName(dessertFilter.getName());
        dessert.setDescription(dessertFilter.getDescription());
        dessert.setPrice(dessertFilter.getPrice());
        dessert.setPicURL(dessertFilter.getUrl());
        dessert.setCafe(cafe);
        if(category==null) {
            Category newCategory = new Category();
            newCategory.setLabel(dessertFilter.getCategory());
            cafeService.addCategory(newCategory);
            dessert.setCategory(newCategory);
        }
        else {
            dessert.setCategory(category);
        }
        cafeService.addDessert(dessert);

        List<Category> cafeCategories = cafe.getCategories();
        boolean have = false;
        for (Category c : cafeCategories) {
            if(c.getLabel().equals(dessertFilter.getCategory())) {
                have = true;
                break;
            }
        }

        if(!have) {
            Category cat = cafeService.getCategoryByName(dessertFilter.getCategory());
            cafeCategories.add(cat);
            cafe.setCategories(cafeCategories);
            cafeService.editCafe(cafe);
        }

        return ResponseEntity.ok(cafe);
    }

    @PostMapping(value = "/plus")
    public ResponseEntity<?> plusDessert(@RequestBody Long id) {
        Users user = getUser();
        List<Basket> basket = userService.getAllFromBasket(user);

        int quantity = 1;
        boolean have = false;
        for (Basket b : basket) {
            if(b.getDessert().getId().equals(id)) {
                b.setQuantity(b.getQuantity()+1);
                userService.editBasket(b);
                quantity = b.getQuantity();
                have = true;
                break;
            }
        }
        if(!have) {
            Dessert dessert = cafeService.getDessert(id);
            Basket newDessert = new Basket(0L, quantity, user, dessert);
            userService.addBasket(newDessert);
        }

        return ResponseEntity.ok(quantity);
    }
    @PostMapping(value = "/minus")
    public ResponseEntity<?> minusDessert(@RequestBody Long id) {
        Users user = getUser();
        List<Basket> basket = userService.getAllFromBasket(user);

        int quantity = 0;
        for (Basket b : basket) {
            if(b.getDessert().getId().equals(id)) {
                b.setQuantity(b.getQuantity()-1);
                if(b.getQuantity()==0)
                    userService.deleteBasket(b);
                else {
                    userService.editBasket(b);
                    quantity = b.getQuantity();
                    break;
                }
            }
        }

        return ResponseEntity.ok(quantity);
    }

    @GetMapping(value = "/getBasket")
    public ResponseEntity<?> getBasket() {
        Users user = getUser();
        List<Basket> basket = userService.getAllFromBasket(user);
        List<BasketFilter> filteredBasket = new ArrayList<>();
        for(Basket b : basket) {
            filteredBasket.add(new BasketFilter(b.getId(), b.getQuantity(), b.getDessert().getName(), b.getDessert().getPicURL(), b.getDessert().getPrice()));
        }
        return new ResponseEntity<>(filteredBasket, HttpStatus.OK);
    }

    @PostMapping(value = "/order")
    public ResponseEntity<?> order() {
        Users user = getUser();
        List<Basket> basket = userService.getAllFromBasket(user);

        for(Basket b : basket) {
            userService.deleteBasket(b);
        }

        return (ResponseEntity<?>) ResponseEntity.ok();
    }

    @PostMapping(value = "/plusMinus")
    public ResponseEntity<?> basketPlusMinus(@RequestBody Long id, @RequestBody String act) {
        System.out.println("Data: " + id + act);
//        Basket basket = userService.getBasket(pm.getId());
//        if(pm.getAct().equals("plus"))
//            basket.setQuantity(basket.getQuantity()+1);
//        else
//            basket.setQuantity(basket.getQuantity()-1);
//
//        userService.editBasket(basket);

        return (ResponseEntity<?>) ResponseEntity.ok();
    }

    @GetMapping(value = "/getRole")
    public ResponseEntity<?> getRole() {
        Users user = getUser();
        
        return new ResponseEntity<>(user.getRole(), HttpStatus.OK);
    }


    private Users getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            Users user = (Users) authentication.getPrincipal();
            return user;
        }
        return null;
    }
}
