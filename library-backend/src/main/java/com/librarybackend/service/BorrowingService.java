package com.librarybackend.service;

import com.librarybackend.dto.BookDTO;
import com.librarybackend.dto.BorrowingDTO;
import com.librarybackend.dto.filter.BorrowingFilterSearch;
import com.librarybackend.entity.BorrowingEntity;
import com.librarybackend.entity.UserEntity;
import com.librarybackend.repository.BorrowingRepository;
import com.librarybackend.utils.CurrentUserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class BorrowingService extends BaseService<BorrowingRepository, BorrowingEntity> {

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    public List<BorrowingDTO> createBorrowing(List<BorrowingDTO> borrowingDTOList) {
        // Convert DTO to Entity
        List<BorrowingEntity> borrowingEntities = borrowingDTOList
                                                    .stream()
                                                    .map(BorrowingEntity::new)
                                                    .map(borrowingEntity -> {
                                                        borrowingEntity.setBorrowDate(LocalDateTime.now());
                                                        return borrowingEntity;
                                                    })
                                                    .collect(Collectors.toList());
        // Saving all
        borrowingEntities = saveAll(borrowingEntities);

        // Get list book id
        List<Long> bookIds = borrowingDTOList.stream()
                .map(e -> e.getBookId())
                .collect(Collectors.toList());

        // Map bookDTO by book id to set to borrowing
        Map<Long, BookDTO> mapBookEntityById = bookService.findByIdIn(bookIds)
                .stream()
                .map(BookDTO::new)
                .collect(Collectors.toMap(BookDTO::getId, Function.identity()));

        return borrowingEntities
                .stream()
                .map(BorrowingDTO::new)
                .map(borrowingDTO -> {
                    borrowingDTO.setBook(mapBookEntityById.get(borrowingDTO.getBookId()));
                    return borrowingDTO;
                })
                .collect(Collectors.toList());
    }

    public List<BorrowingDTO> getListBorrowing(BorrowingFilterSearch borrowingFilterSearch, Pageable pageable) {
        String userCode = borrowingFilterSearch.getUserCode();
        Long userId = userService.findIdByCode(userCode);
        Specification<BorrowingEntity> borrowingSpec =
                Specification.where(hasUserId(userId)).and(deletedFalse());
        Page<BorrowingEntity> borrowingPage = repository.findAll(borrowingSpec, pageable);

        List<BorrowingEntity> borrowingEntities = borrowingPage.getContent();
        List<Long> bookIds = borrowingEntities.stream()
                .map(borrowingEntity -> borrowingEntity.getBookId())
                .collect(Collectors.toList());

        Map<Long, BookDTO> mapBookEntityById = bookService.findByIdIn(bookIds)
                .stream()
                .map(BookDTO::new)
                .collect(Collectors.toMap(BookDTO::getId, Function.identity()));

        return borrowingEntities
                .stream()
                .map(BorrowingDTO::new)
                .map(borrowingDTO -> {
                    borrowingDTO.setBook(mapBookEntityById.get(borrowingDTO.getBookId()));
                    borrowingDTO.setTotalItems(borrowingPage.getTotalElements());
                    borrowingDTO.setTotalPages(borrowingPage.getTotalPages());
                    return borrowingDTO;
                })
                .collect(Collectors.toList());
    }

    public List<BorrowingDTO> getUserBorrowing(String userCode, Pageable pageable) {
        Long userId = userService.findIdByCode(userCode);
        List<BorrowingEntity> borrowingEntities = findAll();
        return borrowingEntities
                .stream()
                .filter(e -> e.getUserId() == userId)
                .map(BorrowingDTO::new)
                .collect(Collectors.toList());
    }


    public void returnBorrowing(String borrowingCode) {
        BorrowingEntity borrowingEntity = findByCode(borrowingCode);
        borrowingEntity.setReturned(!borrowingEntity.isReturned());
        borrowingEntity.setReturnedDate(LocalDateTime.now());
        update(borrowingEntity);
    }

    private Specification<BorrowingEntity> hasUserId(Long userId) {
        return ((root, query, criteriaBuilder) -> {
            if(userId == null) return criteriaBuilder.conjunction();
            return criteriaBuilder.equal(root.get("userId"), userId);
        });
    }

    public void deleteBorrowing(String borrowingCode) {
        delete(borrowingCode);
    }

    public List<BorrowingDTO> getUserListBorrowing(Pageable pageable) {
        UserEntity currentUser = CurrentUserUtils.getCurrentUser();
        String userCode = currentUser.getCode();
        BorrowingFilterSearch borrowingFilterSearch = new BorrowingFilterSearch();
        borrowingFilterSearch.setUserCode(userCode);
        return getListBorrowing(borrowingFilterSearch, pageable);
    }
}
