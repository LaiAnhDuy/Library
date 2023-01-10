package com.librarybackend.entity;

import com.librarybackend.dto.BorrowingDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "borrowing")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BorrowingEntity extends BaseEntity{

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "book_id")
    private Long bookId;

    @Column(name = "borrow_date")
    private LocalDateTime borrowDate;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "price")
    private int price;

    @Column(name = "returned")
    private boolean returned;

    @Column(name = "returned_date")
    private LocalDateTime returnedDate;

    public BorrowingEntity(BorrowingDTO borrowingDTO) {
        this.id = borrowingDTO.getId();
        this.code = borrowingDTO.getCode();
        this.userId = borrowingDTO.getUserId();
        this.bookId = borrowingDTO.getBookId();
        this.borrowDate = borrowingDTO.getBorrowDate();
        this.dueDate = borrowingDTO.getDueDate();
        this.price = borrowingDTO.getPrice();
        this.returned = borrowingDTO.isReturned();
        this.returnedDate = borrowingDTO.getReturnedDate();
        this.createdBy = borrowingDTO.getCreatedBy();
        this.createdDate = borrowingDTO.getCreatedDate();
        this.modifiedBy = borrowingDTO.getModifiedBy();
        this.modifiedDate = borrowingDTO.getModifiedDate();
        this.deleted = borrowingDTO.isDeleted();
    }
}
