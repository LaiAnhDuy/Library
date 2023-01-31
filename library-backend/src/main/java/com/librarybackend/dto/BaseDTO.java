package com.librarybackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseDTO {
    protected Long id;
    protected String code;
    protected LocalDateTime createdDate;
    protected Long createdBy;
    protected LocalDateTime modifiedDate;
    protected Long modifiedBy;
    protected boolean deleted;
    protected long totalItems;
    protected int totalPages;
}
