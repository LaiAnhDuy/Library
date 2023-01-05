package com.librarybackend.entity;

import com.librarybackend.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity extends BaseEntity{

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "role_id")
    private Long roleId;

    public UserEntity(UserDTO userDTO) {
        this.username = userDTO.getUsername();
        this.password = userDTO.getPassword();
        this.email = userDTO.getEmail();
        this.fullname = userDTO.getFullname();
        this.roleId = userDTO.getRoleId();
        this.id = userDTO.getId();
        this.createdDate = userDTO.getCreatedDate();
        this.createdBy = userDTO.getCreatedBy();
        this.modifiedDate = userDTO.getModifiedDate();
        this.modifiedBy = userDTO.getModifiedBy();
        this.deleted = userDTO.isDeleted();
    }
}
