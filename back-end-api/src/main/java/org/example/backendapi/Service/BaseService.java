package org.example.backendapi.Service;

import java.util.List;

public interface BaseService<T> {
    void create(T t);
    void update(T t);
    void delete(Long id);
    List<T> findAll();
    T findById(int id);
    T findByName(String name);
}
