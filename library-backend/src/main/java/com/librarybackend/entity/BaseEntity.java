package com.librarybackend.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

@MappedSuperclass
@Data
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(name = "code")
    protected String code;

    @CreatedDate
    @Column(name = "created_date")
    protected Timestamp createdDate;

    @CreatedBy
    @Column(name = "created_by")
    protected Long createdBy;

    @LastModifiedDate
    @Column(name = "modified_date")
    protected Timestamp modifiedDate;

    @LastModifiedBy
    @Column(name = "modified_by")
    protected Long modifiedBy;

    @Column(name = "deleted")
    protected Boolean deleted;
}
