package com.example.checkin.course;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course,Long> {

    void deleteCourseById(Long id);

    Optional<Course> findCourseById(Long id);

    Optional<Course> findCourseByName(String name);

}
