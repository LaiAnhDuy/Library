package com.librarybackend.service;

import com.librarybackend.entity.BaseEntity;
import com.librarybackend.repository.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public class BaseService<T extends BaseRepository, K extends BaseEntity> {

    @Autowired
    private T t;

    protected K save(K k) {
        UUID code = UUID.randomUUID();
        k.setCode(code.toString());
        t.save(k);
        return k;
    }

    protected K findByIdAndDeletedFalse(Long id) {
        return (K) t.findByIdAndDeletedFalse(id);
    }

    protected K findByCodeAndDeletedFalse(String code) {
        return (K) t.findByCodeAndDeletedFalse(code);
    }

    protected List<K> findByIdInAndDeletedFalse(List<Long> ids) {
        return t.findByIdInAndDeletedFalse(ids);
    }

}
