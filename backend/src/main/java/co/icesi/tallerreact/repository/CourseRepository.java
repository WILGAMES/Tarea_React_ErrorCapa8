package co.icesi.tallerreact.repository;

import java.util.List;

import co.icesi.tallerreact.model.Course;

public interface CourseRepository {

    List<Course> findAll();

    Course save(String name);
}
