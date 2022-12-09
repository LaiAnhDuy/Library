package com.librarybackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.librarybackend.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO extends BaseDTO{

    @JsonIgnore
    private String username;
    private String password;
    private String fullname;
    private String email;
    private Long roleId = 2l;

    public UserDTO(UserEntity userEntity) {
        this.fullname = userEntity.getFullname();
        this.username = userEntity.getUsername();
        this.password = userEntity.getPassword();
        this.email = userEntity.getEmail();
        this.roleId = userEntity.getRoleId();
        this.id = userEntity.getId();
        this.code = userEntity.getCode();
        this.createdDate = userEntity.getCreatedDate();
        this.createdBy = userEntity.getCreatedBy();
        this.modifiedDate = userEntity.getModifiedDate();
        this.modifiedBy = userEntity.getModifiedBy();
        this.deleted = userEntity.isDeleted();
    }
}
