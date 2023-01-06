package com.librarybackend.controller.web;

import com.librarybackend.controller.BaseController;
import com.librarybackend.dto.CategoryDTO;
import com.librarybackend.dto.ServerResponse;
import com.librarybackend.entity.CategoryEntity;
import com.librarybackend.exception.UnknowException;
import com.librarybackend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("webCategoryController")
@RequestMapping("/api/category")
public class CategoryController extends BaseController<CategoryService> {

    @GetMapping("/list-all")
    public ServerResponse getAllCategories() {
        try {
            List<CategoryDTO> categories = service.findAllCategories();
            return ServerResponse.success("Lấy danh sách categories thành công!", categories);
        } catch (Exception exception) {
            throw new UnknowException("Unknow exception get all categories!");
        }
    }

    @GetMapping("/{categoryCode}")
    public ServerResponse getCategoryInfor(@PathVariable("categoryCode") String categoryCode) {
        try {
            CategoryDTO categoryDTO = service.getCategoryInfor(categoryCode);
            return ServerResponse.success("Lấy thông tin category thành công!", categoryDTO);
        } catch (Exception exception) {
            throw new UnknowException("Unknow exception get category infor!");
        }
    }
}
