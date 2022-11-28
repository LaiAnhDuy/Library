package com.librarybackend.exception;

public class WrongUsernamPasswordException extends RuntimeException {
    public WrongUsernamPasswordException(String message) {
        super(message);
    }
}
