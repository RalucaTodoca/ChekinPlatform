package com.example.checkin.course;

import com.example.checkin.user.User;
import com.example.checkin.user.UserRepository;
import com.example.checkin.user.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository, UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }
    public void deleteCourse(Long id) {
        if (courseRepository.existsById(id)){
            courseRepository.deleteCourseById(id);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Course with id: " + id + " was not found!");
        }
    }

    public void addCourse(Course course) {
        Optional<Course> courseOptional = courseRepository.findCourseByName(course.getName());
        if (courseOptional.isPresent()){
            throw new IllegalStateException("Course with name: " + course.getName() + " already exists");
        }
        courseRepository.save(course);
    }
    public Course findCourseById(Long id)
    {
        return courseRepository.findCourseById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course with id: " + id +" was not found"));
    }

    public void updateCourse(Long id, Course updatedCourse){
        Course course = courseRepository.findCourseById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course with id: " + id + " was not found!")
        );
        if (updatedCourse.getName() != null && !(updatedCourse.getName().equals(course.getName()))){
            course.setName(updatedCourse.getName());
        }
        if (updatedCourse.getYear() != null && !updatedCourse.getYear().equals(course.getYear())){
            course.setYear(updatedCourse.getYear());
        }
        if (updatedCourse.getSection() != null && !(updatedCourse.getSection().equals(course.getSection()))){
            course.setSection(updatedCourse.getSection());
        }
        courseRepository.save(course);
    }

    public List<Course> findAllCourses() {
        return courseRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public CourseDTO mapEntityToDto(Course course){
        CourseDTO courseDTO = new CourseDTO();
        courseDTO.setId(course.getId());
        courseDTO.setName(course.getName());
        courseDTO.setYear(course.getYear());
        courseDTO.setSection(course.getSection());
        return courseDTO;
    }

    public List<CourseDTO> mapEntitiesToDTO(List<Course> courses){
        return courses.stream().map(this::mapEntityToDto).collect(Collectors.toList());
    }

    public void assignTeacherToCourse(Long courseId, Long teacherId) {
        Course course = courseRepository.findCourseById(courseId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course with id: "+ courseId + " not found!")
        );
        User teacher = userRepository.findUserById(teacherId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Teacher with id: "+ teacherId + " not found!")
        );
        if (teacher.getRole().equals(UserRole.TEACHER)) {
            course.setTeacher(teacher);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id: " + teacherId + " is not a teacher");
        }
        courseRepository.save(course);
    }

    public void partialUpdateCourse(Long courseId, Map<String, Object> request) {
        Course course = courseRepository.findCourseById(courseId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course with id: " + courseId + " not found!")
        );
        request.forEach((k,v) -> {
            Field field = ReflectionUtils.findField(Course.class, k);
            if (field != null){
                field.setAccessible(true);
                ReflectionUtils.setField(field, course, v);
            }
        });
        courseRepository.save(course);
    }
}
