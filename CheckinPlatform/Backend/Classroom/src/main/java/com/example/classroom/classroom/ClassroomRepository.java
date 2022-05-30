package com.example.checkin.classroom;

import com.example.checkin.classroom.Classroom;
import com.example.checkin.feature.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {

    void deleteClassroomById(Long id);

    Optional<Classroom> findClassroomById(Long id);

    Optional<Classroom> findClassroomByName(String name);


}
