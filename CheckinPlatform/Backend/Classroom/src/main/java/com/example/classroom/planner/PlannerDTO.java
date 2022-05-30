package com.example.checkin.planner;

import com.example.checkin.classroom.Classroom;
import com.example.checkin.classroom.ClassroomDTO;
import com.example.checkin.course.Course;
import com.example.checkin.course.CourseDTO;
import com.example.checkin.user.User;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class PlannerDTO {

    private Long id;
    private String startTime;
    private CourseDTO course;
    private ClassroomDTO classroom;
    private Integer remainingPlaces;
    private Integer dayOfWeek;
    private Set<Long> enrolledStudents;

    public PlannerDTO() {
    }

    public PlannerDTO(Long id, String startTime, CourseDTO course, ClassroomDTO classroom, Set<Long> enrolledStudents) {
        this.id = id;
        this.startTime = startTime;
        this.course = course;
        this.classroom = classroom;
        this.enrolledStudents = enrolledStudents;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartTime() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
        Date date = null;
        try {
            date = dateFormat.parse(this.startTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Calendar cal = Calendar.getInstance();
        if (date != null) {
            cal.setTime(date);
        }

        int hour = cal.get(Calendar.HOUR);
        int minute = cal.get(Calendar.MINUTE);

        StringBuilder time = new StringBuilder();
        if (hour < 10){
            time.append(0).append(hour);
        } else {
            time.append(hour);
        }
        time.append(":");
        if (minute < 10){
            time.append(0).append(minute);
        } else {
            time.append(minute);
        }
        return time.toString();

    }

    public void setStartTime(String startTime) { this.startTime = startTime; }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public ClassroomDTO getClassroom() {
        return classroom;
    }

    public void setClassroom(ClassroomDTO classroom) {
        this.classroom = classroom;
    }

    public Integer getRemainingPlaces() {
        return remainingPlaces;
    }

    public void setRemainingPlaces(Integer remainingPlaces) {
        this.remainingPlaces = remainingPlaces;
    }

    public Set<Long> getEnrolledStudents() {
        return enrolledStudents;
    }

    public void setEnrolledStudents(Set<Long> enrolledStudents) {
        this.enrolledStudents = enrolledStudents;
    }

    public Integer getDayOfWeek() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
        Date date = null;
        try {
            date = dateFormat.parse(this.startTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Calendar cal = Calendar.getInstance();
        if (date != null) {
            cal.setTime(date);
        }
        return cal.get(Calendar.DAY_OF_WEEK)-1;
    }

    @Override
    public String toString() {
        return "PlannerDTO{" +
                "id=" + id +
                ", startTime='" + startTime + '\'' +
                ", course=" + course +
                ", classroom=" + classroom +
                ", remainingPlaces=" + remainingPlaces +
                ", dayOfWeek=" + dayOfWeek +
                '}';
    }
}
