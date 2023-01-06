package com.librarybackend.service;

import com.librarybackend.dto.CategoryDTO;
import com.librarybackend.entity.CategoryEntity;
import com.librarybackend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService extends BaseService<CategoryRepository, CategoryEntity> {

    public List<CategoryDTO> findAllCategories() {
        List<CategoryEntity> categoryEntities = findAllAndDeletedFalse();
        return categoryEntities
                .stream()
                .map(CategoryDTO::new)
                .collect(Collectors.toList());
    }

    public CategoryDTO createNewCategory(CategoryDTO categoryDTO) {
        CategoryEntity categoryToCreate = new CategoryEntity(categoryDTO);
        categoryToCreate = save(categoryToCreate);
        return new CategoryDTO(categoryToCreate);
    }

    public CategoryDTO getCategoryInfor(String categoryCode) {
        CategoryEntity foundCategory = findByCode(categoryCode);
//        System.out.println(30 + " foundCategory");
        System.out.println(foundCategory.getName());
        return new CategoryDTO(foundCategory);
    }

    public void deleteCategory(String categoryCode) {
        delete(categoryCode);
    }

    public void updateCategory(CategoryDTO categoryDTO) {
        CategoryEntity categoryToUpdate = findByCode(categoryDTO.getCode());
        categoryToUpdate.setName(categoryDTO.getName());
        update(categoryToUpdate);
    }

}
