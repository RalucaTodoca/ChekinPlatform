package com.example.checkin.planner;

import com.example.checkin.classroom.Classroom;
import com.example.checkin.classroom.ClassroomDTO;
import com.example.checkin.classroom.ClassroomRepository;
import com.example.checkin.course.Course;
import com.example.checkin.course.CourseDTO;
import com.example.checkin.course.CourseRepository;
import com.example.checkin.user.User;
import com.example.checkin.user.UserRepository;
import com.example.checkin.user.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlannerService {
    private final PlannerRepository plannerRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ClassroomRepository classroomRepository;

    @Autowired
    public PlannerService(PlannerRepository plannerRepository, UserRepository userRepository, CourseRepository courseRepository, ClassroomRepository classroomRepository) {
        this.plannerRepository = plannerRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.classroomRepository = classroomRepository;
    }

    public void addPlanner(String time, Long classroomId, Long courseId) {

        Classroom classroom = classroomRepository.findClassroomById(classroomId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Classroom with id: "+ classroomId + " not found!")
        );
        Course course = courseRepository.findCourseById(courseId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course with id: "+ courseId + " not found!")
        );
        Planner planner = new Planner(time, course, classroom);

        classroom.addPlanner(planner);
        classroomRepository.save(classroom);
    }

    public Planner findPlannerById(Long plannerId) {
        return plannerRepository.findPlannerById(plannerId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Planner with id: " + plannerId +" was not found")
        );
    }

    public List<PlannerDTO> findAllPlanners(){
        List<Planner> planners = plannerRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return mapEntitiesToDTO(planners);
    }

    public Planner assignStudentToPlanner(Long plannerId, Long userId) {
        Planner planner = plannerRepository.findPlannerById(plannerId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Planner with id: " + plannerId + " not found!")
        );
        User user = userRepository.findUserById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id: " + userId + " not found!")
        );
        if ((user.getRole().equals(UserRole.STUDENT) &&
                planner.getRemainingPlaces()>0)){
            if (!(planner.getEnrolledStudents().contains(user.getId()))){
                planner.assignStudent(user);
                planner.setRemainingPlaces(planner.getRemainingPlaces()-1);
            }
        }
        else throw new IllegalStateException("Only students are allowed to enroll");
        return plannerRepository.save(planner);
    }

    public PlannerDTO mapPlannerToDto(Planner planner){
        PlannerDTO plannerDto = new PlannerDTO();
        plannerDto.setId(planner.getId());
        plannerDto.setStartTime(planner.getStartTime());
        plannerDto.setCourse(mapCourseToDto(planner.getCourse()));
        plannerDto.setClassroom(mapClassroomToDto(planner.getClassroom()));
        plannerDto.setRemainingPlaces(planner.getRemainingPlaces());
        plannerDto.setEnrolledStudents(planner.getEnrolledStudents());
        return plannerDto;
    }

    public ClassroomDTO mapClassroomToDto(Classroom classroom){
        ClassroomDTO classroomDto = new ClassroomDTO();
        classroomDto.setId(classroom.getId());
        classroomDto.setName(classroom.getName());
        classroomDto.setLocation(classroom.getLocation());
        classroomDto.setCapacity(classroom.getCapacity());
        return classroomDto;
    }

    public CourseDTO mapCourseToDto(Course course){
        CourseDTO courseDTO = new CourseDTO();
        courseDTO.setId(course.getId());
        courseDTO.setName(course.getName());
        courseDTO.setYear(course.getYear());
        courseDTO.setSection(course.getSection());
        return courseDTO;
    }

    public List<PlannerDTO> mapEntitiesToDTO(List<Planner> planners){
        return planners.stream().map(this::mapPlannerToDto).collect(Collectors.toList());
    }

    public void deletePlanner(Long plannerId) {
        if(plannerRepository.existsById(plannerId)){
            plannerRepository.deletePlannerById(plannerId);
        } else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Planner with id: " + plannerId + " not found!");
        }
    }

    public Boolean checkIfPlannerHasUser(Long plannerId, Long studentId) {
        List<Planner> planners = plannerRepository.findAll();
        for (Planner planner: planners){
            if (planner.getEnrolledStudents().contains(studentId)){
                return true;
            }
        }
        return false;
    }
}
