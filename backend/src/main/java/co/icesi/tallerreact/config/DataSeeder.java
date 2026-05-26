package co.icesi.tallerreact.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import co.icesi.tallerreact.repository.CourseRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CourseRepository courseRepository;

    public DataSeeder(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public void run(String... args) {
        if (courseRepository.findAll().isEmpty()) {
            courseRepository.save("Introducción a Redes");
            courseRepository.save("Programación Web");
            courseRepository.save("Arquitectura de Software");
        }
    }
}
