package com.librarybackend.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "role")
@Data
public class RoleEntity extends BaseEntity{

    @Column(name = "name")
    private String name;
}
