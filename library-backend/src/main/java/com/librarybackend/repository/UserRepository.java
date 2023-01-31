package com.librarybackend.repository;

import com.librarybackend.entity.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<UserEntity> {
    UserEntity findByUsername(String username);
    int countDistinctByDeletedFalse();
    @Query(value = "select count(*) from user " +
            "where created_date > now() - interval 7 day " +
            "and deleted = false " +
            "and role_id = 2", nativeQuery = true)
    int countNewUserOverTheLast7Days();

    UserEntity findByCode(String userCode);
}
