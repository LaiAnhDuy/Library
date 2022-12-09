package com.librarybackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServerResponseDTO {

    private int status;
    private String message;
    private Object data;

    private ServerResponseDTO(int status, Object data) {
        this.status = status;
        this.data = data;
    }

    public static ServerResponseDTO success(int status, String message) {
        return new ServerResponseDTO(status, message);
    }

    public static ServerResponseDTO success(int status, String message, Object data) {
        return new ServerResponseDTO(status, message, data);
    }

    public static ServerResponseDTO error(int status, String message) {
        return new ServerResponseDTO(status, message, null);
    }

}
