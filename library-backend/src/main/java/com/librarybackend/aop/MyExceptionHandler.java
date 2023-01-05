package com.librarybackend.aop;

import com.librarybackend.dto.ServerResponse;
import com.librarybackend.exception.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Slf4j
public class MyExceptionHandler {

    @ExceptionHandler(WrongUsernamPasswordException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ServerResponse wrongUsernamePasswordException(WrongUsernamPasswordException exception) {
        System.out.println("Vao controller advice, sai ten dang nhap");
        return ServerResponse.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @ExceptionHandler(InvalidTokenException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ServerResponse invalidToken(InvalidTokenException exception) {
        System.out.println("Controller advice, token khong hop le");
        return ServerResponse.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @ExceptionHandler(UnauthorizeException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ServerResponse unauthorize(UnauthorizeException exception) {
        System.out.println("Controller advice, unauthorize");
        return ServerResponse.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @ExceptionHandler(DuplicateAccountException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ServerResponse duplicateAccount(DuplicateAccountException exception) {
        System.out.println("Controller advice, duplicate");
        return ServerResponse.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @ExceptionHandler(UnknowException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ServerResponse unknowError(UnknowException exception) {
        log.info("lỗi");
        log.trace("lỗi", exception);
        exception.printStackTrace();
        System.out.println("Controller advice, unknow exception!");
        return ServerResponse.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @ExceptionHandler(DisableAccountException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ServerResponse disableAccount(DisableAccountException exception) {
        exception.printStackTrace();
        System.out.println("Controller advice, disable account");
        return ServerResponse.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }
}