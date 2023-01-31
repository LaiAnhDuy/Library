package com.librarybackend.repository;

import com.librarybackend.entity.BookEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends BaseRepository<BookEntity> {

    Page<BookEntity> findByCategoryIdAndDeletedFalse(Long id, Pageable pageable);
    int countDistinctByDeletedFalse();
}
