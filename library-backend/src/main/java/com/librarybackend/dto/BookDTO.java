package com.librarybackend.dto;

import com.librarybackend.entity.BookEntity;
import lombok.*;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO extends BaseDTO{
    private Long categoryId;
    private String title;
    private String description;
    private int totalPages;
    private String author;
    private String publisher;
    private String language;
    private int price;
    private LocalDateTime boughtDate;
    private String imgUrl;

    public BookDTO(BookEntity bookEntity) {
        this.categoryId = bookEntity.getCategoryId();
        this.title = bookEntity.getTitle();
        this.description = bookEntity.getDescription();
        this.totalPages = bookEntity.getTotalPages();
        this.author = bookEntity.getAuthor();
        this.publisher = bookEntity.getPublisher();
        this.language = bookEntity.getLanguage();
        this.price = bookEntity.getPrice();
        this.boughtDate = bookEntity.getBoughtDate();
        this.imgUrl = bookEntity.getImgUrl();

        this.id = bookEntity.getId();
        this.code = bookEntity.getCode();
        this.createdBy = bookEntity.getCreatedBy();
        this.createdDate = bookEntity.getCreatedDate();
        this.modifiedBy = bookEntity.getModifiedBy();
        this.modifiedDate = bookEntity.getModifiedDate();
        this.deleted = bookEntity.isDeleted();
    }
}
