package com.librarybackend.service;

import com.librarybackend.dto.UserDTO;
import com.librarybackend.entity.UserEntity;
import com.librarybackend.repository.UserRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService extends BaseService<UserRepository, UserEntity> {

    public UserDTO createUser(UserDTO userToCreate) {
        UserEntity entityToCreate = new UserEntity(userToCreate);
        UserEntity createdUser = save(entityToCreate);
        return new UserDTO(createdUser);
    }

    public UserDTO getUserInfor(String userCode) {
        UserEntity userEntity = findByCode(userCode);
        return new UserDTO(userEntity);
    }

    public void updateUser(UserDTO userToUpdate) {
        UserEntity entityToUpdate = findByCode(userToUpdate.getCode());
        // TODO update user information

        entityToUpdate.setFullname(userToUpdate.getFullname());
        update(entityToUpdate);
    }

    public void deleteUser(String userCode) {
        delete(userCode);
    }

    public List<UserDTO> getListUser(Pageable pageable) {
        List<UserEntity> userEntities = findAll();
        return userEntities.stream().map(UserDTO::new).collect(Collectors.toList());
    }


}
