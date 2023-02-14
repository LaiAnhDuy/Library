package com.librarybackend.service;

import com.librarybackend.dto.AnalyticDTO;
import com.librarybackend.dto.BookDTO;
import com.librarybackend.dto.BorrowingDTO;
import com.librarybackend.dto.filter.BorrowingFilterSearch;
import com.librarybackend.entity.BorrowingEntity;
import com.librarybackend.repository.BookRepository;
import com.librarybackend.repository.BorrowingRepository;
import com.librarybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class AnalyticService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BorrowingRepository borrowingRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    public AnalyticDTO getAnalyticData() {
        AnalyticDTO analyticDTO = new AnalyticDTO();
        int totalBooks = bookRepository.countDistinctByDeletedFalse();
        int totalBorrowing = borrowingRepository.countDistinctByDeletedFalseAndReturnedFalse();
        int totalReader = userRepository.countDistinctByDeletedFalse();
        int totalNewUser = userRepository.countNewUserOverTheLastNDays(7);
        for(int i = 0; i<7; ++i) {
            analyticDTO.getNewBorrowingIn7Days().add(borrowingRepository.countNewBorrowingOverTheLastNDays(i+1));
            analyticDTO.getNewUserIn7Days().add(userRepository.countNewUserOverTheLastNDays(i+1));
        }
        analyticDTO.setOverduedBorrowing(getListBorrowing());
        analyticDTO.setTotalBooks(totalBooks);
        analyticDTO.setTotalBorrowing(totalBorrowing);
        analyticDTO.setTotalReader(totalReader);
        analyticDTO.setTotalNewUser(totalNewUser);
        return analyticDTO;
    }

    private List<BorrowingDTO> getListBorrowing() {

        List<BorrowingEntity> borrowingEntities = borrowingRepository.count7Overdued();
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
                    return borrowingDTO;
                })
                .collect(Collectors.toList());
    }
}
