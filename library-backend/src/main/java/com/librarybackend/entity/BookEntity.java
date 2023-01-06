package com.librarybackend.entity;

import com.librarybackend.dto.BookDTO;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookEntity extends BaseEntity{

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "total_pages")
    private int totalPages;

    @Column(name = "author")
    private String author;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "language")
    private String language;

    @Column(name = "price")
    private int price;

    @Column(name = "bought_date")
    private LocalDateTime boughtDate;

    public BookEntity(BookDTO bookDTO) {
        this.categoryId = bookDTO.getCategoryId();
        this.title = bookDTO.getTitle();
        this.description = bookDTO.getDescription();
        this.totalPages = bookDTO.getTotalPages();
        this.author = bookDTO.getAuthor();
        this.publisher = bookDTO.getPublisher();
        this.language = bookDTO.getLanguage();
        this.price = bookDTO.getPrice();
        this.boughtDate = bookDTO.getBoughtDate();

        this.id = bookDTO.getId();
        this.code = bookDTO.getCode();
        this.createdBy = bookDTO.getCreatedBy();
        this.createdDate = bookDTO.getCreatedDate();
        this.modifiedBy = bookDTO.getModifiedBy();
        this.modifiedDate = bookDTO.getModifiedDate();
        this.deleted = bookDTO.isDeleted();
    }

}

