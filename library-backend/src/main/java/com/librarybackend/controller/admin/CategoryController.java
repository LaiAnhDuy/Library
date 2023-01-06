package com.librarybackend.controller.admin;

import com.librarybackend.controller.BaseController;
import com.librarybackend.dto.CategoryDTO;
import com.librarybackend.dto.ServerResponse;
import com.librarybackend.exception.UnknowException;
import com.librarybackend.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("adminCategoryController")
@RequestMapping("/admin/api/category")
public class CategoryController extends BaseController<CategoryService> {

    @PostMapping("/")
    public ServerResponse createCategory(@RequestBody CategoryDTO categoryDTO) {
        try {
            CategoryDTO createdCategory = service.createNewCategory(categoryDTO);
            return ServerResponse.success("Tạo mới category thành công!", createdCategory);
        } catch (Exception exception) {
            throw new UnknowException("Unknow exception create category!");
        }
    }

    @DeleteMapping("/{categoryCode}")
    public ServerResponse deleteCategory(@PathVariable("categoryCode") String categoryCode) {
        try {
            service.deleteCategory(categoryCode);
            return ServerResponse.success("Xóa category thành công!");
        } catch (Exception e) {
            throw new UnknowException("Unknow exception delete category!");
        }
    }

    @PutMapping("/")
    public ServerResponse updateCategory(@RequestBody CategoryDTO categoryDTO) {
        try {
            service.updateCategory(categoryDTO);
            return ServerResponse.success("Cập nhật category thành công!");
        } catch (Exception e) {
            throw new UnknowException("Unknow exception update category!");
        }
    }

    @GetMapping("/list-all")
    public ServerResponse getAllCategory() {
        try {
            List<CategoryDTO> listCategory = service.findAllCategories();
            return ServerResponse.success("Lấy danh sách category thành công!", listCategory);
        } catch (Exception e) {
            throw new UnknowException("Unknow exception get all category!");
        }
    }

    @GetMapping("/{categoryCode}")
    public ServerResponse getCategoryInfor(@PathVariable("categoryCode") String categoryCode) {
        try {
            CategoryDTO categoryDTO = service.getCategoryInfor(categoryCode);
            return ServerResponse.success("Lấy thông tin category thành công!", categoryDTO);
        } catch (Exception e) {
            throw new UnknowException("Unknow exception get category infor!");
        }
    }

}
