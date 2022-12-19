package com.librarybackend.repository;

import com.librarybackend.entity.BaseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity> extends JpaRepository<T, Long> {
    T findByIdAndDeletedFalse(Long id);
    T findByCodeAndDeletedFalse(String code);
    List<T> findByIdInAndDeletedFalse(List<Long> ids);
    List<T> findByCodeInAndDeletedFalse(List<String> codes);
    Page<T> findAll(Pageable pageable);
}
