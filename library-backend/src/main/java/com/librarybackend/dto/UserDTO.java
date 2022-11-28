package com.librarybackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.librarybackend.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    @JsonIgnore
    private Long id;
    private String code;
    private String username;
    private String password;
    private String fullname;
    private String email;
    private Long roleId = 2l;

    public UserDTO(UserEntity userToSave) {
        this.id = userToSave.getId();
        this.code = userToSave.getCode();
        this.fullname = userToSave.getFullname();
        this.username = userToSave.getUsername();
        this.password = userToSave.getPassword();
        this.email = userToSave.getEmail();
        this.roleId = userToSave.getRoleId();
    }
}
