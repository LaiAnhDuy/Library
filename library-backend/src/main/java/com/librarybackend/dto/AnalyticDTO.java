package com.librarybackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticDTO {

    private int totalBooks;
    private int totalBorrowing;
    private int totalReader;
    private int totalNewUser;
    private List<Integer> newBorrowingIn7Days = new ArrayList<>();
    private List<Integer> newUserIn7Days = new ArrayList<>();
    private List<BorrowingDTO> overduedBorrowing = new ArrayList<>();
}
