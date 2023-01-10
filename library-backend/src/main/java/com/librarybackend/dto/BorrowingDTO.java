package com.librarybackend.dto;

import com.librarybackend.entity.BorrowingEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BorrowingDTO extends BaseDTO{
    private Long userId;
    private Long bookId;
    private String userCode;
    private String bookCode;
    private LocalDateTime borrowDate;
    private LocalDateTime dueDate;
    private int price;
    private boolean returned;
    private LocalDateTime returnedDate;
    private BookDTO book;

    public BorrowingDTO(BorrowingEntity borrowingEntity) {
        this.userId = borrowingEntity.getUserId();
        this.bookId = borrowingEntity.getBookId();
        this.id = borrowingEntity.getId();
        this.code = borrowingEntity.getCode();
        this.borrowDate = borrowingEntity.getBorrowDate();
        this.dueDate = borrowingEntity.getDueDate();
        this.returned = borrowingEntity.isReturned();
        this.returnedDate = borrowingEntity.getReturnedDate();
        this.price = borrowingEntity.getPrice();
        this.createdBy = borrowingEntity.getCreatedBy();
        this.createdDate = borrowingEntity.getCreatedDate();
        this.modifiedBy = borrowingEntity.getModifiedBy();
        this.modifiedDate = borrowingEntity.getModifiedDate();
        this.deleted = borrowingEntity.isDeleted();
    }
}
