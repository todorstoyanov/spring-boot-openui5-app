package com.todor.catalog;

import com.todor.catalog.dto.CategoryDTO;
import com.todor.catalog.entity.Category;
import com.todor.catalog.entity.Item;
import com.todor.catalog.repository.CategoryRepository;
import com.todor.catalog.repository.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("api")
public class CatalogController {

    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("ping")
    public String getPing() {
return "Catalog Application UP and Running! ";
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("categories")
    public void createCategory(@RequestBody CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setIcon(categoryDTO.getIcon());
        categoryRepository.save(category);
        String[] items = categoryDTO.getItems().split(",");
        Arrays.stream(items).forEach(itemName -> {
            Item item = new Item();
            item.setName(itemName);
            item.setCategory(category);
            itemRepository.save(item);
        });
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("categories")
    public List<CategoryDTO> getCategories() {
        return categoryRepository.findAll().stream().map(category -> {
            List<Item> items = itemRepository.findAllByCategory(category);
            String itemsString = items.stream().map(item -> item.getName()).collect( Collectors.joining( "," ));
            return new CategoryDTO(category.getName(), category.getIcon(), itemsString);
        }).collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("categories/{category}")
    @Transactional
    public void deleteCategory(@PathVariable("category") String categoryName) {
        Category category = categoryRepository.findByName(categoryName);
        System.out.println(categoryName);
        System.out.println(category);
        itemRepository.deleteAllByCategory(category);
        categoryRepository.delete(category);
    }
}
