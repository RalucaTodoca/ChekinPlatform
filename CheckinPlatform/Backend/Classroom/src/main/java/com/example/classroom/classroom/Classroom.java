package com.example.checkin.classroom;

import com.example.checkin.feature.Feature;
import com.example.checkin.planner.Planner;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@JsonIgnoreProperties({ "planners" })
public class Classroom {

    @Id
    @Column(name = "classroom_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String location;
    @Column(nullable = false)
    private Integer capacity;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "classroom_features",
            joinColumns = @JoinColumn(name = "classroom_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id"))
    private Set<Feature> features = new HashSet<>();

    @OneToMany(mappedBy = "classroom", cascade = CascadeType.ALL)
    private Set<Planner> planners = new HashSet<>();

    public Classroom() {
    }

    public Classroom(String name, String location, Integer capacity, Set<Feature> features) {
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.features = features;
    }

    public Classroom(String name, String location, Integer capacity) {
        this.name = name;
        this.location = location;
        this.capacity = capacity;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Set<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(Set<Feature> features) {
        this.features = features;
    }

    public void removeAllFeatures(){ this.features.clear();}

    public Set<Planner> getPlanners() {
        return planners;
    }

    public void setPlanners(Set<Planner> planners) {
        this.planners = planners;
    }

    public void assignFeature(Feature feature) {
        features.add(feature);
    }

    public void addPlanner(Planner planner){ planners.add(planner); }

    @Override
    public String toString() {
        return "Classroom{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", capacity=" + capacity +
                ", features=" + features +
                ", planners=" + planners +
                '}';
    }
}


