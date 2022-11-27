package com.librarybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface BaseRepository<T> extends JpaRepository<T, Long> {
    T findByIdAndDeletedFalse(Long id);
    T findByCodeAndDeletedFalse(String code);
    List<T> findByIdInAndDeletedFalse(List<Long> id);
}
