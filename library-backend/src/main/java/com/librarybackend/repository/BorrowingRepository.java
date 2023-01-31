package com.librarybackend.repository;

import com.librarybackend.entity.BorrowingEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowingRepository extends BaseRepository<BorrowingEntity> {

    Page<BorrowingEntity> findByUserIdAndDeletedFalse(Long userId, Pageable pageable);
    int countDistinctByDeletedFalseAndReturnedFalse();

}
