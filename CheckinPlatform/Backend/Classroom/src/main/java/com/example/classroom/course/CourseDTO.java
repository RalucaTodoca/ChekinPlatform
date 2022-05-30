package com.example.checkin.course;

public class CourseDTO {

    private Long id;
    private String name;
    private Integer year;
    private String section;

    public CourseDTO() {
    }

    public CourseDTO(Long id, String name, Integer year, String section) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.section = section;
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

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    @Override
    public String toString() {
        return "CourseDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", year=" + year +
                ", section='" + section + '\'' +
                '}';
    }
}
