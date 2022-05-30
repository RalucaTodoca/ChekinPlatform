package com.example.checkin.feature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FeatureService {

    private final FeatureRepository featureRepository;

    @Autowired
    public FeatureService(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    public void addFeature(Feature feature){
        Optional<Feature> featureOptional = featureRepository.findFeatureByName(feature.getName());
        if (featureOptional.isPresent()){
            throw new IllegalStateException("Feature with name: " + feature.getName() + " already exists");
        }
        featureRepository.save(feature);
    }

    public Feature findFeatureById(Long id){
        return featureRepository.findFeatureById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Feature with id: " + id + " not found!")
        );
    }

    public List<Feature> findAllFeatures(){
        return featureRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public void deleteFeature(Long id){
        if (featureRepository.existsById(id)){
            featureRepository.deleteFeatureById(id);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Feature with id: " + id + " not found!");
        }
    }

    public void updateFeature(Long featureId, Feature updatedFeature) {
        System.out.println("RECEIVED: " + updatedFeature);
        Feature feature = featureRepository.findFeatureById(featureId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Feature with id: " + featureId + " not found!")
        );
        if (updatedFeature.getName() != null  && !(updatedFeature.getName().equals(feature.getName()))){
            feature.setName(updatedFeature.getName());
        }
        featureRepository.save(feature);
    }
}
