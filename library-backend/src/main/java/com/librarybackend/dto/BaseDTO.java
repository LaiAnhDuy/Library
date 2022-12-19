package com.librarybackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseDTO {
    protected Long id;
    protected String code;
    protected Timestamp createdDate;
    protected Long createdBy;
    protected Timestamp modifiedDate;
    protected Long modifiedBy;
    protected boolean deleted;
}
