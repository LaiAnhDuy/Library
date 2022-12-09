package com.librarybackend.service;

import com.librarybackend.dto.UserDTO;
import com.librarybackend.entity.UserEntity;
import com.librarybackend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseService<UserRepository, UserEntity> {

    public UserDTO createUser(UserDTO userToCreate) {
        UserEntity entityToCreate = new UserEntity(userToCreate);
        UserEntity createdUser = save(entityToCreate);
        return new UserDTO(createdUser);
    }

    public UserDTO readUser(String userCode) {
        UserEntity userEntity = findByCode(userCode);
        return new UserDTO(userEntity);
    }

    public void updateUser(UserDTO userToUpdate) {
        UserEntity entityToUpdate = findByCode(userToUpdate.getCode());
        entityToUpdate.setFullname(userToUpdate.getFullname());
        update(entityToUpdate);
    }

    public void deleteUser(String userCode) {
        delete(userCode);
    }
}
