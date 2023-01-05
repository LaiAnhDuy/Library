package com.librarybackend.controller.admin;

import com.librarybackend.controller.BaseController;
import com.librarybackend.dto.ServerResponse;
import com.librarybackend.dto.UserDTO;
import com.librarybackend.exception.UnknowException;
import com.librarybackend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@RequestMapping("/admin/api/user")
@Slf4j
public class UserController extends BaseController<UserService> {

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/list-all")
    public ServerResponse getListUser(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            List<UserDTO> userList = service.getListUser(pageable);
            return ServerResponse.success("Lấy danh sách người dùng thành công!",userList);
        } catch (Exception exception) {
            throw new UnknowException("Unknow exception get list user!");
        }
    }

    @GetMapping("/{userCode}")
    public ServerResponse getUserInfor(@PathVariable("userCode") String userCode) {
        try {
            UserDTO userDTO = service.getUserInfor(userCode);
            return ServerResponse.success("Lấy thông tin thành công!", userDTO);
        } catch (Exception exception) {
            log.trace("Lỗi get user infor api!");
            throw new UnknowException("Unknow exception in getting user!");
        }
    }

    @DeleteMapping("/{userCode}")
    public ServerResponse deleteUser(@PathVariable("userCode") String userCode) {
        try {
            service.deleteUser(userCode);
            return ServerResponse.success("Xóa người dùng thành công!");
        } catch (Exception exception) {
            log.trace("Lỗi delete user api!");
            throw new UnknowException("Unknow exception in deleting api!");
        }
    }

    @PutMapping("/")
    public ServerResponse updateUser(@RequestBody UserDTO userToUpdate) {
        try {
            service.updateUser(userToUpdate);
            return ServerResponse.success("Cập nhật người dùng thành công!");
        } catch (Exception exception) {
            log.trace("Lỗi update user api!");
            throw new UnknowException("Unknow exception in updating api!");
        }
    }
}
