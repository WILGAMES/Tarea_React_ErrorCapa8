package co.icesi.tallerreact.mapper;

import org.springframework.stereotype.Component;

import co.icesi.tallerreact.dto.CourseResponse;
import co.icesi.tallerreact.model.Course;

@Component
public class CourseMapper {

    public CourseResponse toResponse(Course course) {
        return new CourseResponse(course.id(), course.name());
    }
}
