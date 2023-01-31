package com.librarybackend.service;

import com.librarybackend.dto.UserDTO;
import com.librarybackend.entity.UserEntity;
import com.librarybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService extends BaseService<UserRepository, UserEntity> {

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDTO createUser(UserDTO userToCreate) {
        UserEntity entityToCreate = new UserEntity(userToCreate);
        entityToCreate.setPassword(passwordEncoder.encode(entityToCreate.getPassword()));
        entityToCreate.setCreatedDate(LocalDateTime.now());
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

    public void toggleDeleted(String userCode) {
        UserEntity userToToggle = findByCode(userCode);
        userToToggle.setDeleted(!userToToggle.isDeleted());
        update(userToToggle);
    }

    public List<UserDTO> getListUser(Pageable pageable) {
        List<UserEntity> userEntities = findAll();
        return userEntities.stream().map(UserDTO::new).collect(Collectors.toList());
    }


}
