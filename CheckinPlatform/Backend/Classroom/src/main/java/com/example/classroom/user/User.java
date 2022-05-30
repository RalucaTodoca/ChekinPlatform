package com.example.checkin.user;

import com.example.checkin.course.Course;
import com.example.checkin.planner.Planner;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private Integer year;
    private String department;
    private String section;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @JsonIgnore
    @ManyToMany(mappedBy = "enrolledStudents")
    private Set<Planner> planners = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "teacher")
    private Set<Course> courses = new HashSet<>();

    public User() {
    }

    public User(String firstName, String lastName, Integer year, String department, String section, UserRole role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.year = year;
        this.department = department;
        this.section = section;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole userRole) {
        this.role = userRole;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public Set<Planner> getPlanners() {
        return planners;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userRole=" + role +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", year=" + year +
                ", department='" + department + '\'' +
                ", section='" + section + '\'' +
                '}';
    }

}
