package com.librarybackend.service;

import com.librarybackend.entity.UserEntity;
import com.librarybackend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseService<UserRepository, UserEntity> {
}
