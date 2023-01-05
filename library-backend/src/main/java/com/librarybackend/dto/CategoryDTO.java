package com.librarybackend.dto;

import com.librarybackend.entity.CategoryEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO extends BaseDTO{

    private String name;

    public CategoryDTO(CategoryEntity categoryEntity) {
        this.id = categoryEntity.getId();
        this.name = categoryEntity.getName();
        this.code = categoryEntity.getCode();
        this.createdBy = categoryEntity.getCreatedBy();
        this.createdDate = categoryEntity.getCreatedDate();
        this.modifiedBy = categoryEntity.getModifiedBy();
        this.modifiedDate = categoryEntity.getModifiedDate();
        this.deleted = categoryEntity.isDeleted();
    }
}
