package com.example.checkin.feature;

import com.example.checkin.classroom.Classroom;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@JsonIgnoreProperties({ "classroomList" })

public class Feature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "features")
    private Set<Classroom> classroomList = new HashSet<>();

    public Feature() {
    }

    public Feature(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Classroom> getClassroomList() {
        return classroomList;
    }

    public void setClassroomList(Set<Classroom> classroomList) {
        this.classroomList = classroomList;
    }

    @Override
    public String toString() {
        return "Feature{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", classroomList=" + classroomList +
                '}';
    }

}
