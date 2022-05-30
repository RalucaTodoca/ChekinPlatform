package com.example.checkin.planner;

import com.example.checkin.user.User;
import com.example.checkin.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "/planner")
public class PlannerController {

    private final PlannerService plannerService;

    public PlannerController(PlannerService plannerService, PlannerRepository plannerRepository, UserRepository userRepository) {
        this.plannerService = plannerService;
    }

    @PostMapping(path = "/classroom/{classroomId}/course/{courseId}")
    public ResponseEntity<Planner> addPlanner(
            @PathVariable("classroomId") Long classroomId,
            @PathVariable("courseId") Long courseId,
            @RequestBody String time){
        plannerService.addPlanner(time, classroomId, courseId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(path = "/{plannerId}")
    public ResponseEntity<Planner> getPlannerById(@PathVariable("plannerId") Long plannerId){
        Planner planner = plannerService.findPlannerById(plannerId);
        return new ResponseEntity<>(planner, HttpStatus.OK);
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<PlannerDTO>> getAllPlanners(){
        List<PlannerDTO> planners = plannerService.findAllPlanners();
        return new ResponseEntity<>(planners, HttpStatus.OK);
    }

    @PutMapping(path = "/{plannerId}/student/{studentId}")
    public ResponseEntity<Planner> assignUserToPlanner(@PathVariable Long plannerId, @PathVariable Long studentId){
        Planner planner = plannerService.assignStudentToPlanner(plannerId, studentId);
        return new ResponseEntity<>(planner, HttpStatus.OK);
    }

//    @GetMapping(path = "/{plannerId}/check-student/{studentId}")
//    public ResponseEntity<Boolean> checkIfPlannerHasUser(
//            @PathVariable("plannerId") Long plannerId,
//            @PathVariable("studentId") Long studentId){
//        Boolean check = this.plannerService.checkIfPlannerHasUser(plannerId, studentId);
//        return new ResponseEntity<Boolean>(check, HttpStatus.OK);
//    }

    @DeleteMapping(path = "/{plannerId}")
    public void deletePlanner(@PathVariable("plannerId") Long plannerId){
        plannerService.deletePlanner(plannerId);
    }

}
