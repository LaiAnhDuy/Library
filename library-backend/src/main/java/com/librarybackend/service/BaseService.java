package com.librarybackend.service;

import com.librarybackend.entity.BaseEntity;
import com.librarybackend.repository.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public abstract class BaseService<T extends BaseRepository, K extends BaseEntity> {

    @Autowired
    protected T repository;

    protected K save(K entityToSave) {
        UUID code = UUID.randomUUID();
        entityToSave.setCode(code.toString());
        return (K) repository.save(entityToSave);
    }

    protected K findById(Long id) {
        return (K) repository.findByIdAndDeletedFalse(id);
    }

    protected K findByCode(String code) {
        return (K) repository.findByCodeAndDeletedFalse(code);
    }

    protected List<K> findByIdIn(List<Long> ids) {
        return repository.findByIdInAndDeletedFalse(ids);
    }

    protected List<K> findByCodeIn(List<String> codes) {
        return repository.findByCodeInAndDeletedFalse(codes);
    }

    protected List<K> findAll(Pageable pageable) {
        return repository.findAll(pageable).getContent();
    }

    protected void delete(Long id) {
        K entityToDelete = findById(id);
        entityToDelete.setDeleted(true);
        repository.save(entityToDelete);
    }

    protected void delete(String code) {
        K entityToDelete = findByCode(code);
        entityToDelete.setDeleted(true);
        repository.save(entityToDelete);
    }

    protected void update(K k) {
        repository.save(k);
    }

}
