package com.librarybackend.service;

import com.librarybackend.entity.BaseEntity;
import com.librarybackend.repository.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

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

    protected List<K> saveAll(List<K> listEntityToSave) {
        for(K entity : listEntityToSave) {
            entity = save(entity);
        }
        return listEntityToSave;
    }

    protected K findById(Long id) {
        return (K) repository.findByIdAndDeletedFalse(id);
    }

    protected K findByCode(String code) {
        return (K) repository.findByCodeAndDeletedFalse(code);
    }

    protected Long findIdByCode(String code) {
        K k = findByCode(code);

        return k == null ? null : k.getId();
    }

    protected String findCodeById(Long id) {
        return findById(id).getCode();
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

    protected List<K> findAll() {
        return repository.findAll();
    };

    protected List<K> findAllAndDeletedFalse(Pageable pageable) {
        return repository.findByDeletedFalse(pageable);
    }

    protected List<K> findAllAndDeletedFalse() {
        return repository.findByDeletedFalse();
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

    protected Specification<K> deletedFalse() {
        return ((root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("deleted"), false);
        });
    }



}
