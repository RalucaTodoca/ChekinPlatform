package com.example.checkin.course;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/course")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping()
    public ResponseEntity<Course> registerCourse(@RequestBody Course course){
        courseService.addCourse(course);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<Course>> getAllCourses(){
        List<Course> courses = courseService.findAllCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping(path = "/{courseId}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long courseId){
        Course course = courseService.findCourseById(courseId);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable("courseId") Long courseId)
    {
        courseService.deleteCourse(courseId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping(path = "/{courseId}")
    public void editCourse(@PathVariable("courseId") Long courseId, @RequestBody Course course){
        courseService.updateCourse(courseId, course);
    }

    @PutMapping(path = "/{courseId}/teacher/{teacherId}")
    public void assignTeacherToCourse(@PathVariable Long courseId, @PathVariable Long teacherId){
        courseService.assignTeacherToCourse(courseId, teacherId);
    }

    @PatchMapping(path = "/{courseId}")
    public void partialUpdateCourse(
            @PathVariable("courseId") Long courseId,
            @RequestBody Map<String, Object> request){
        courseService.partialUpdateCourse(courseId, request);
    }

}
