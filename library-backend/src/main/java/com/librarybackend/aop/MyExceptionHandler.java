package com.librarybackend.aop;

import com.librarybackend.dto.ErrorResponseDTO;
import com.librarybackend.dto.ServerResponseDTO;
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
    public ServerResponseDTO wrongUsernamePasswordException(WrongUsernamPasswordException exception) {
        System.out.println("Vao controller advice, sai ten dang nhap");
        return ServerResponseDTO.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @ExceptionHandler(InvalidTokenException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ServerResponseDTO invalidToken(InvalidTokenException exception) {
        System.out.println("Controller advice, token khong hop le");
        return ServerResponseDTO.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @ExceptionHandler(UnauthorizeException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ServerResponseDTO unauthorize(UnauthorizeException exception) {
        System.out.println("Controller advice, unauthorize");
        return ServerResponseDTO.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @ExceptionHandler(DuplicateAccountException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ServerResponseDTO duplicateAccount(DuplicateAccountException exception) {
        System.out.println("Controller advice, duplicate");
        return ServerResponseDTO.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @ExceptionHandler(UnknowException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ServerResponseDTO unknowError(UnknowException exception) {
        log.info("lỗi");
        log.trace("lỗi", exception);
        exception.printStackTrace();
        System.out.println("Controller advice, unknow exception!");
        return ServerResponseDTO.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }

    @ExceptionHandler(DisableAccountException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ServerResponseDTO disableAccount(DisableAccountException exception) {
        exception.printStackTrace();
        System.out.println("Controller advice, disable account");
        return ServerResponseDTO.error(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
    }
}