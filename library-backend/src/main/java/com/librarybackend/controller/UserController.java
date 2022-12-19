package com.librarybackend.controller;

import com.librarybackend.dto.ServerResponseDTO;
import com.librarybackend.dto.UserDTO;
import com.librarybackend.exception.UnknowException;
import com.librarybackend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController extends BaseController<UserService> {

    @GetMapping("/{userCode}")
    public ServerResponseDTO getUserInfor(@PathVariable("userCode") String userCode) {
        try {
            UserDTO userDTO = service.readUser(userCode);
            return ServerResponseDTO.success(
                    HttpStatus.OK.value(),
                    "Lấy thông tin thành công!",
                    userDTO);
        } catch (Exception exception) {
            log.trace("Lỗi get user infor api!");
            throw new UnknowException("Unknow exception in getting user!");
        }
    }

    @DeleteMapping("/{userCode}")
    public ServerResponseDTO deleteUser(@PathVariable("userCode") String userCode) {
        try {
            service.deleteUser(userCode);
            return ServerResponseDTO.success(HttpStatus.OK.value(), "Xóa người dùng thành công!");
        } catch (Exception exception) {
            log.trace("Lỗi delete user api!");
            throw new UnknowException("Unknow exception in deleting api!");
        }
    }

    @PutMapping("/")
    public ServerResponseDTO updateUser(@RequestBody UserDTO userToUpdate) {
        try {
            service.updateUser(userToUpdate);
            return ServerResponseDTO.success(HttpStatus.OK.value(), "Cập nhật người dùng thành công!");
        } catch (Exception exception) {
            log.trace("Lỗi update user api!");
            throw new UnknowException("Unknow exception in updating api!");
        }
    }
}
