package com.librarybackend.controller.admin;

import com.librarybackend.dto.AnalyticDTO;
import com.librarybackend.dto.ServerResponse;
import com.librarybackend.exception.UnknowException;
import com.librarybackend.service.AnalyticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytic")
public class AnalyticController {

    @Autowired
    private AnalyticService analyticService;

    @GetMapping("/")
    public ServerResponse getAnalyticData() {
        try {
            AnalyticDTO analyticDTO = analyticService.getAnalyticData();
            return ServerResponse.success("Lấy thông tin thống kê thành công!", analyticDTO);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new UnknowException("Unknow exception get analytic data!");
        }
    }
}
