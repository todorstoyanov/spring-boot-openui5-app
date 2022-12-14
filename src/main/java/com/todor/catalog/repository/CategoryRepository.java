package com.todor.catalog.repository;

import com.todor.catalog.entity.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoryRepository extends CrudRepository<Category, Long> {
    List<Category> findAll();
    Category findByName(String name);
}
