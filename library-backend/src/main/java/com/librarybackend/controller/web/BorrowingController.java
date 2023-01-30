package com.librarybackend.controller.web;

import com.librarybackend.controller.BaseController;
import com.librarybackend.dto.BorrowingDTO;
import com.librarybackend.dto.ServerResponse;
import com.librarybackend.exception.UnknowException;
import com.librarybackend.service.BorrowingService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("webBorrowingController")
@RequestMapping("/api/borrowing")
public class BorrowingController extends BaseController<BorrowingService> {

    @GetMapping("/list-all")
    public ServerResponse getListBorrowing(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            List<BorrowingDTO> borrowingList = service.getUserListBorrowing(pageable);
            return ServerResponse.success("Lấy danh sách mượn thành công!", borrowingList);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new UnknowException("Unknow exception get user list borrowing!");
        }
    }
}
