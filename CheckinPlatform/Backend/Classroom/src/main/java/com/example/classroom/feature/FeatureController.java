package com.example.checkin.feature;

import com.example.checkin.classroom.Classroom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/feature")
public class FeatureController {

    private final FeatureService featureService;

    @Autowired
    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    @PostMapping()
    public ResponseEntity<Feature> registerFeature(@RequestBody Feature feature){
        featureService.addFeature(feature);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(path = "/{featureId}")
    public ResponseEntity<Feature> getFeatureById(@PathVariable("featureId") Long featureId){
        Feature feature = featureService.findFeatureById(featureId);
        return new ResponseEntity<>(feature, HttpStatus.OK);
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<Feature>> getAllFeatures(){
        List<Feature> featureList = featureService.findAllFeatures();
        return new ResponseEntity<>(featureList, HttpStatus.OK);
    }

    @PutMapping(path = "/{featureId}")
    public void editFeature(
            @PathVariable("featureId") Long featureId,
            @RequestBody Feature feature){
        featureService.updateFeature(featureId, feature);
    }

    @DeleteMapping(path = "/{featureId}")
    public void deleteFeature(@PathVariable("featureId") Long featureId){
        featureService.deleteFeature(featureId);
    }
}
