package com.librarybackend.aop;

import com.librarybackend.dto.ErrorResponseDTO;
import com.librarybackend.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class MyExceptionHandler {
    private ErrorResponseDTO errorResponse = new ErrorResponseDTO();

    @ExceptionHandler(WrongUsernamPasswordException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorResponseDTO wrongUsernamePasswordException(WrongUsernamPasswordException exception) {
        System.out.println("Vao controller advice, sai ten dang nhap");
        errorResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        errorResponse.setMessage(exception.getMessage());
        return errorResponse;
    }

    @ExceptionHandler(InvalidTokenException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorResponseDTO invalidToken(InvalidTokenException exception) {
        System.out.println("Controller advice, token khong hop le");
        errorResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        errorResponse.setMessage(exception.getMessage());
        return errorResponse;
    }

    @ExceptionHandler(UnauthorizeException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorResponseDTO unauthorize(UnauthorizeException exception) {
        System.out.println("Controller advice, unauthorize");
        errorResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        errorResponse.setMessage(exception.getMessage());
        return errorResponse;
    }

    @ExceptionHandler(DuplicateAccountException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorResponseDTO duplicateAccount(DuplicateAccountException exception) {
        System.out.println("Controller advice, duplicate");
        errorResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        errorResponse.setMessage(exception.getMessage());
        return errorResponse;
    }

    @ExceptionHandler(UnknowException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorResponseDTO unknowError(UnknowException exception) {
        exception.printStackTrace();
        System.out.println("Controller advice, unknow exception!");
        errorResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        errorResponse.setMessage(exception.getMessage());
        return errorResponse;
    }

    @ExceptionHandler(DisableAccountException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorResponseDTO disableAccount(DisableAccountException exception) {
        exception.printStackTrace();
        System.out.println("Controller advice, disable account");
        errorResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        errorResponse.setMessage(exception.getMessage());
        return errorResponse;
    }
}