package com.librarybackend.controller.admin;

import com.librarybackend.controller.BaseController;
import com.librarybackend.dto.BookDTO;
import com.librarybackend.dto.ServerResponse;
import com.librarybackend.dto.filter.BookFilterSearch;
import com.librarybackend.exception.UnknowException;
import com.librarybackend.service.BookService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/api/book")
public class BookController extends BaseController<BookService> {

    @GetMapping("/list-all")
    public ServerResponse getListBooks(@RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "10") int size,
                                       BookFilterSearch bookFilterSearch) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            List<BookDTO> listBooks = service.getListBooks(bookFilterSearch, pageable);
            return ServerResponse.success("Lấy danh sách sách thành công!", listBooks);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new UnknowException("Unknow exception in get list book!");
        }
    }

    @PostMapping("/")
    public ServerResponse createBook(@RequestBody BookDTO bookPayload) {
        try {
            BookDTO createdBook = service.createNewBook(bookPayload);
            return ServerResponse.success("Thêm sách thành công!", createdBook);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new UnknowException("Unknow exception creating book!");
        }
    }

    @GetMapping("/{bookCode}")
    public ServerResponse getBookInfor(@PathVariable("bookCode") String bookCode) {
        try {
            BookDTO bookDTO = service.getBookInfor(bookCode);
            return ServerResponse.success("Lấy thông tin sách thành công!", bookDTO);
        } catch (Exception exception) {
            throw new UnknowException("Unknow exception get book infor!");
        }
    }

    @PutMapping("/")
    public ServerResponse updateBook(@RequestBody BookDTO bookToUpdate) {
        try {
            service.updateBook(bookToUpdate);
            return ServerResponse.success("Cập nhật sách thành công!");
        } catch (Exception e) {
            throw new UnknowException("Unknow exception cập nhật sách!");
        }
    }

    @DeleteMapping("/{bookCode}")
    public ServerResponse deleteBook(@PathVariable("bookCode") String bookCode) {
        try {
            service.deleteBook(bookCode);
            return ServerResponse.success("Xóa sách thành công!");
        } catch (Exception e) {
            throw new UnknowException("Unknow exception xóa sách!");
        }
    }
}
