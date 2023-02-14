package com.librarybackend.repository;

import com.librarybackend.entity.BorrowingEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowingRepository extends BaseRepository<BorrowingEntity> {

    Page<BorrowingEntity> findByUserIdAndDeletedFalse(Long userId, Pageable pageable);
    int countDistinctByDeletedFalseAndReturnedFalse();

    @Query(value = "select count(*) from borrowing " +
            "where created_date > now() - interval :n day " +
            "and  create_date < now() - interval :m day " +
            "and deleted = false ", nativeQuery = true)
    int countNewBorrowingOverTheLastNDays(@Param("n") int day1, @Param("m") int day2);


    @Query(value = "select * from borrowing " +
            "where due_date < now() " +
            "limit 10", nativeQuery = true)
    List<BorrowingEntity> count7Overdued();
}
