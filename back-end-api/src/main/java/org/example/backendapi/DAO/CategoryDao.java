package org.example.backendapi.DAO;

import org.example.backendapi.Dto.Category;

import java.util.List;

public interface CategoryDao {
    List<Category> getAll();
}
