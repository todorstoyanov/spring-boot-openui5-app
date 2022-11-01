package com.todor.catalog.repository;

import com.todor.catalog.entity.Category;
import com.todor.catalog.entity.Item;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ItemRepository extends CrudRepository<Item, Long> {
    List<Item> findAllByCategory(Category category);
    void deleteAllByCategory(Category category);
}
