package com.librarybackend.entity;

import com.librarybackend.dto.UserDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
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

    public UserEntity(UserDTO userDTO) {
        this.username = userDTO.getUsername();
        this.password = userDTO.getPassword();
        this.email = userDTO.getEmail();
        this.fullname = userDTO.getFullname();
        this.roleId = userDTO.getRoleId();
    }
}
