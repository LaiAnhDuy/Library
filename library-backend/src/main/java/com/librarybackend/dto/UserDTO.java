package com.librarybackend.dto;

import com.librarybackend.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO extends BaseDTO{
    private String username;
    private String password;
    private String fullname;
    private String email;
    private Long roleId = 2l;

    public UserDTO(UserEntity userEntity) {
        this.fullname = userEntity.getFullname();
//        this.username = userEntity.getUsername();
        this.password = "";
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
