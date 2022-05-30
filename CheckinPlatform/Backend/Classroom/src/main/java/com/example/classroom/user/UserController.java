package com.example.checkin.user;

import com.example.checkin.planner.Planner;
import com.example.checkin.planner.PlannerDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping()
    public ResponseEntity<User> addUser(@RequestBody User user){
        userService.addUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<UserDTO>> getAllUsers () {
        List<UserDTO> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(path = "/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") Long userId){
        User user = userService.findUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping(path = "/admin/{adminId}")
    public ResponseEntity<Boolean> checkIfAdminExists(@PathVariable("adminId") Long adminId){
        Boolean exists =  userService.checkIfAdminExists(adminId);
        return new ResponseEntity<Boolean>(exists, HttpStatus.OK);
    }

    @GetMapping(path = "/teacher/{teacherId}")
    public ResponseEntity<Boolean> checkIfTeacherExists(@PathVariable("teacherId") Long teacherId){
        Boolean exists =  userService.checkIfTeacherExists(teacherId);
        return new ResponseEntity<Boolean>(exists, HttpStatus.OK);
    }

    @GetMapping(path = "/student/{studentId}")
    public ResponseEntity<Boolean> checkIfStudentExists(@PathVariable("studentId") Long studentId){
        Boolean exists =  userService.checkIfStudentExists(studentId);
        return new ResponseEntity<Boolean>(exists, HttpStatus.OK);
    }

    @GetMapping(path = "/{userId}/planners")
    public ResponseEntity<List<PlannerDTO>> getStudentPlanners(@PathVariable("userId") Long userId){
        List<PlannerDTO> planners = userService.getStudentPlanners(userId);
        return new ResponseEntity<>(planners, HttpStatus.OK);
    }

    @GetMapping(path = "/guests")
    public ResponseEntity<List<User>> getAllGuests () {
        List<User> users = userService.findAllGuests();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(path = "/students")
    public ResponseEntity<List<User>> getAllStudents () {
        List<User> users = userService.findAllStudents();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(path = "/teachers")
    public ResponseEntity<List<User>> getAllTeachers () {
        List<User> users = userService.findAllTeachers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(path = "/admins")
    public ResponseEntity<List<User>> getAllAdmins () {
        List<User> users = userService.findAllAdmins();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

}
