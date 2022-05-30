package com.example.checkin.feature;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeatureRepository extends JpaRepository<Feature, Long> {

    void deleteFeatureById(Long id);

    Optional<Feature> findFeatureById(Long id);

    Optional<Feature> findFeatureByName(String name);
}
