package com.librarybackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServerResponse {

    private int status;
    private String message;
    private Object data;

    private ServerResponse(int status, Object data) {
        this.status = status;
        this.data = data;
    }

    public static ServerResponse success(int status, String message) {
        return new ServerResponse(status, message);
    }

    public static ServerResponse success(String message) {
        return new ServerResponse(HttpStatus.OK.value(), message);
    }

    public static ServerResponse success(int status, String message, Object data) {
        return new ServerResponse(status, message, data);
    }

    public static ServerResponse success(String message, Object data) {
        return new ServerResponse(HttpStatus.OK.value(), message, data);
    }

    public static ServerResponse error(int status, String message) {
        return new ServerResponse(status, message, null);
    }

}
