package co.icesi.tallerreact.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.icesi.tallerreact.dto.CourseCreateRequest;
import co.icesi.tallerreact.dto.CourseResponse;
import co.icesi.tallerreact.services.CourseService;
import jakarta.validation.Valid;

@RestController
@RequestMapping
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping({"/courses", "/api/courses"})
    public List<CourseResponse> listCourses() {
        return courseService.findAll();
    }

    @PostMapping({"/courses", "/api/courses"})
    public CourseResponse createCourse(@Valid @RequestBody CourseCreateRequest request) {
        return courseService.create(request);
    }
}
