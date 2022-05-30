package com.example.checkin.user;

import com.example.checkin.planner.Planner;
import com.example.checkin.planner.PlannerDTO;
import com.example.checkin.planner.PlannerService;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PlannerService plannerService;

    public UserService(UserRepository userRepo, PlannerService plannerService) {
        this.userRepository = userRepo;
        this.plannerService = plannerService;
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public List<UserDTO> findAllUsers(){
        List<User> users = userRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return mapEntitiesToDTO(users);
    }

    public User findUserById(Long id){
        return userRepository.findUserById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id: " + id +" was not found")
        );
    }

    public List<User> findAllGuests(){
        return userRepository.findAllByRole(UserRole.GUEST);
    }

    public List<User> findAllStudents(){
        return userRepository.findAllByRole(UserRole.STUDENT);
    }

    public List<User> findAllTeachers(){
        return userRepository.findAllByRole(UserRole.TEACHER);
    }

    public List<User> findAllAdmins(){
        return userRepository.findAllByRole(UserRole.ADMIN);
    }

    public UserDTO mapEntityToDto(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setRole(user.getRole());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        return userDTO;
    }

    public List<UserDTO> mapEntitiesToDTO(List<User> users){
        return users.stream().map(this::mapEntityToDto).collect(Collectors.toList());
    }

    public List<PlannerDTO> getStudentPlanners(Long userId) {
        User user = userRepository.findUserById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id: " + userId +" was not found")
        );
        if (user.getRole().equals(UserRole.STUDENT)){
            Set<Planner> planners = user.getPlanners();
            List<Planner> plannerList = List.copyOf(planners);

            return this.plannerService.mapEntitiesToDTO(plannerList);
        }
        else {
            throw new IllegalStateException("Only students have planners");
        }
    }

    public Boolean checkIfAdminExists(Long adminId) {
        List<User> admins = userRepository.findAllByRole(UserRole.ADMIN);
        User admin = userRepository.findUserById(adminId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id: " + adminId +" was not found")
        );
        return admins.contains(admin);
    }

    public Boolean checkIfTeacherExists(Long teacherId) {
        List<User> teachers = userRepository.findAllByRole(UserRole.TEACHER);
        User teacher = userRepository.findUserById(teacherId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id: " + teacherId +" was not found")
        );
        return teachers.contains(teacher);
    }

    public Boolean checkIfStudentExists(Long studentId) {
        List<User> students = userRepository.findAllByRole(UserRole.STUDENT);
        User student = userRepository.findUserById(studentId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id: " + studentId +" was not found")
        );
        return students.contains(student);
    }
}
