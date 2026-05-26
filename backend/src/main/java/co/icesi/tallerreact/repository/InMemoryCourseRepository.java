package co.icesi.tallerreact.repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

import co.icesi.tallerreact.model.Course;

@Repository
public class InMemoryCourseRepository implements CourseRepository {

    private final ConcurrentHashMap<Long, Course> storage = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0);

    @Override
    public List<Course> findAll() {
        return storage.values()
            .stream()
            .sorted(Comparator.comparing(Course::id))
            .toList();
    }

    @Override
    public Course save(String name) {
        long id = sequence.incrementAndGet();
        Course course = new Course(id, name);
        storage.put(id, course);
        return course;
    }
}
