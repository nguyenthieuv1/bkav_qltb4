package org.example.backendapi.Controller;

import org.example.backendapi.Service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCategory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Current Authentication: " + authentication);
        System.out.println("Is Authenticated? " + authentication.isAuthenticated());
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

}
