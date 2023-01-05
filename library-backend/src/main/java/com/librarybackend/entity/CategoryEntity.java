package com.librarybackend.entity;

import com.librarybackend.dto.CategoryDTO;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity extends BaseEntity{

    @Column(name = "name")
    private String name;

    public CategoryEntity(CategoryDTO categoryDTO) {
        this.code = categoryDTO.getCode();
        this.name = categoryDTO.getName();
        this.createdBy = categoryDTO.getCreatedBy();
        this.createdDate = categoryDTO.getCreatedDate();
        this.modifiedBy = categoryDTO.getModifiedBy();
        this.modifiedDate = categoryDTO.getModifiedDate();
        this.deleted = categoryDTO.isDeleted();
    }
}
