package com.librarybackend.service;

import com.librarybackend.dto.BookDTO;
import com.librarybackend.dto.filter.BookFilterSearch;
import com.librarybackend.entity.BookEntity;
import com.librarybackend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService extends BaseService<BookRepository, BookEntity> {

    @Autowired
    private CategoryService categoryService;

    public BookDTO createNewBook(BookDTO bookPayload) {
        BookEntity bookToCreate = new BookEntity(bookPayload);
        BookEntity createdBook = save(bookToCreate);
        return new BookDTO(createdBook);
    }

    public BookDTO getBookInfor(String bookCode) {
        BookEntity bookEntity = findByCode(bookCode);
        return new BookDTO(bookEntity);
    }

    public void updateBook(BookDTO bookToUpdate) {
        BookEntity bookEntityToUpdate = findByCode(bookToUpdate.getCode());
        // TODO -  set lai cac thuoc tinh cua book  can update
        bookEntityToUpdate.setTitle(bookToUpdate.getTitle());
        bookEntityToUpdate.setDescription(bookToUpdate.getDescription());
        bookEntityToUpdate.setBoughtDate(bookToUpdate.getBoughtDate());
        bookEntityToUpdate.setAuthor(bookEntityToUpdate.getAuthor());
        bookEntityToUpdate.setPublisher(bookEntityToUpdate.getPublisher());

        update(bookEntityToUpdate);
    }

    public void deleteBook(String bookCode) {
        delete(bookCode);
    }

    public List<BookDTO> getListBooks(BookFilterSearch bookFilterSearch, Pageable pageable) {

        String bookTitle = bookFilterSearch.getTitle();
        String categoryCode = bookFilterSearch.getCategoryCode();
        Long categoryId = categoryService.findIdByCode(categoryCode);
        Specification<BookEntity> bookSpec = Specification.where(hasTitleLike(bookTitle))
                .and(hasCategoryId(categoryId))
                .and(deletedFalse());
        Page<BookEntity> bookPage = repository.findAll(bookSpec, pageable);
        List<BookEntity> bookEntities = bookPage.getContent();
        return bookEntities.stream()
                .map(BookDTO::new)
                .collect(Collectors.toList());
    }

    private Specification<BookEntity> hasTitleLike(String bookTitle) {
        return ((root, query, criteriaBuilder) -> {
            if(bookTitle == null || bookTitle.equals("")) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(root.get("title"), "%" + bookTitle + "%");
        });
    }

    private Specification<BookEntity> hasCategoryId(Long categoryId) {
        return ((root, query, criteriaBuilder) -> {
            if(categoryId == null || categoryId.equals("")) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("categoryId"), categoryId);
        });
    }

    public List<BookDTO> searchBook(String bookName, String categoryCode, Pageable pageable) {
        Long categoryId = categoryService.findIdByCode(categoryCode);
        Specification<BookEntity> searchBookSpec = Specification.where(hasTitleLike(bookName))
                .and(hasCategoryId(categoryId));
        Page<BookEntity> bookEntities = repository.findByDeletedFalse(searchBookSpec, pageable);
        return bookEntities.getContent().stream().map(BookDTO::new).collect(Collectors.toList());
    }
}
