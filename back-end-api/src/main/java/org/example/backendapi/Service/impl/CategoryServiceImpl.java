package org.example.backendapi.Service.impl;

import org.example.backendapi.DAO.CategoryDao;
import org.example.backendapi.Dto.Category;
import org.example.backendapi.Service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private CategoryDao categoryDao ;

    public CategoryServiceImpl(CategoryDao categoryDao) {
        this.categoryDao = categoryDao;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryDao.getAll();
    }
}
