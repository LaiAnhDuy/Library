package com.librarybackend.repository;

import com.librarybackend.entity.UserEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<UserEntity> {
    UserEntity findByUsername(String username);
}
