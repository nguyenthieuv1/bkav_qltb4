package org.example.backendapi.Dto;

import org.example.backendapi.Entity.CategoryEntity;

public class Category {
    private Long id;
    private String name;
    private String note;
    private Long categoryId;

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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public CategoryEntity toEntity(){
        CategoryEntity category = new CategoryEntity();
        category.setId(this.id);
        category.setName(this.name);
        category.setNote(this.note);
        return category;
    }
}
