package org.example.backendapi.DAO.impl;

import org.example.backendapi.DAO.CategoryDao;
import org.example.backendapi.Dto.Category;
import org.example.backendapi.Entity.CategoryEntity;
import org.example.backendapi.repository.CategoryRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CategoryDaoImpl implements CategoryDao {

    private CategoryRepository categoryRepository;

    public CategoryDaoImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAll() {
        List<CategoryEntity> categoryEntities = categoryRepository.findAll();
        List<Category> categoryList = new ArrayList<>();
        for (CategoryEntity categoryEntity : categoryEntities) {
            categoryList.add(categoryEntity.toDto());
        }
        return categoryList;
    }
}
