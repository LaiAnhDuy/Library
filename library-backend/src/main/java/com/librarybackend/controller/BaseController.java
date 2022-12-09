package com.librarybackend.controller;

import com.librarybackend.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class BaseController<T extends BaseService> {

    @Autowired
    public T service;
}
