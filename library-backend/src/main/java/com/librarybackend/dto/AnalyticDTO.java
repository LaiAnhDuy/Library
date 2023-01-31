package com.librarybackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticDTO {

    private int totalBooks;
    private int totalBorrowing;
    private int totalReader;
    private int totalNewUser;
}
