package org.example.backendapi.Entity;

import jakarta.persistence.*;
import org.example.backendapi.Dto.Category;
import org.example.backendapi.constants.NameTableConstant;

import java.util.List;

@Entity
@Table(name = NameTableConstant.CATEGORY_TABLE)
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String note;

    @OneToMany(mappedBy = "category")
    private List<DeviceEntity> devides;

    public Category toDto(){
        Category category = new Category();
        category.setId(this.id);
        category.setName(this.name);
        category.setNote(this.note);
        return category;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
