package com.example.checkin.planner;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PlannerRepository extends JpaRepository<Planner, Long> {

    void deletePlannerById(Long id);

    Optional<Planner> findPlannerById(Long id);


}
