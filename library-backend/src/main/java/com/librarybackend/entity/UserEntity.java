package com.librarybackend.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "user")
@Data
public class UserEntity extends BaseEntity{

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "email")
    private String email;

    @Column(name = "role_id")
    private Long roleId;
}
