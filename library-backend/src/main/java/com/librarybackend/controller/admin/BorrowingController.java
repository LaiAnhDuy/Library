package com.librarybackend.controller.admin;

import com.librarybackend.controller.BaseController;
import com.librarybackend.dto.BorrowingDTO;
import com.librarybackend.dto.ServerResponse;
import com.librarybackend.dto.filter.BorrowingFilterSearch;
import com.librarybackend.exception.UnknowException;
import com.librarybackend.service.BorrowingService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("adminBorrowingController")
@RequestMapping("/admin/api/borrowing")
public class BorrowingController extends BaseController<BorrowingService> {

    @PostMapping("/")
    public ServerResponse createBorrowing(@RequestBody List<BorrowingDTO> borrowingDTOList) {
        try {
            List<BorrowingDTO> createdBorrowingList = service.createBorrowing(borrowingDTOList);
            return ServerResponse.success("Tạo danh sách mượn thành công!", createdBorrowingList);
        } catch (Exception e) {
            throw new UnknowException("Unknow exception createBorrowing!");
        }
    }

    @GetMapping("/list-all")
    public ServerResponse getListBorrowing(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size,
                                           BorrowingFilterSearch borrowingFilterSearch) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            List<BorrowingDTO> borrowingDTOS = service.getListBorrowing(borrowingFilterSearch, pageable);
            return ServerResponse.success("Lấy tất cả danh sách mượn thành công!", borrowingDTOS);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new UnknowException("Unknow exception get all borrowing!");
        }
    }

    @PutMapping("/{borrowingCode}/")
    public ServerResponse returnBorrowing(@PathVariable("borrowingCode") String borrowingCode) {
        try {
            service.returnBorrowing(borrowingCode);
            return ServerResponse.success("Trả sách thành công!");
        } catch (Exception exception) {
            throw new UnknowException("Unknow exception return borrowing!");
        }
    }

    @DeleteMapping("/{borrowingCode}")
    public ServerResponse deleteBorrowing(@PathVariable("borrowingCode") String borrowingCode) {
        try {
            service.deleteBorrowing(borrowingCode);
            return ServerResponse.success("Xóa mượn thành công!");
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new UnknowException("Unknow exception delete borrowing!");
        }
    }

}
