package com.librarybackend.service;

import com.librarybackend.dto.AnalyticDTO;
import com.librarybackend.repository.BookRepository;
import com.librarybackend.repository.BorrowingRepository;
import com.librarybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnalyticService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BorrowingRepository borrowingRepository;

    public AnalyticDTO getAnalyticData() {
        AnalyticDTO analyticDTO = new AnalyticDTO();
        int totalBooks = bookRepository.countDistinctByDeletedFalse();
        int totalBorrowing = borrowingRepository.countDistinctByDeletedFalseAndReturnedFalse();
        int totalReader = userRepository.countDistinctByDeletedFalse();
        int totalNewUser = userRepository.countNewUserOverTheLast7Days();
        analyticDTO.setTotalBooks(totalBooks);
        analyticDTO.setTotalBorrowing(totalBorrowing);
        analyticDTO.setTotalReader(totalReader);
        analyticDTO.setTotalNewUser(totalNewUser);
        return analyticDTO;
    }
}
