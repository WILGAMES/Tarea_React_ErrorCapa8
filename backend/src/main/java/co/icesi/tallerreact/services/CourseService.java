package co.icesi.tallerreact.services;

import java.util.List;

import org.springframework.stereotype.Service;

import co.icesi.tallerreact.dto.CourseCreateRequest;
import co.icesi.tallerreact.dto.CourseResponse;
import co.icesi.tallerreact.mapper.CourseMapper;
import co.icesi.tallerreact.model.Course;
import co.icesi.tallerreact.repository.CourseRepository;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    public List<CourseResponse> findAll() {
        return courseRepository.findAll()
            .stream()
            .map(courseMapper::toResponse)
            .toList();
    }

    public CourseResponse create(CourseCreateRequest request) {
        Course course = courseRepository.save(request.name().trim());
        return courseMapper.toResponse(course);
    }
}
