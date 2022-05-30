package com.example.checkin.classroom;

import com.example.checkin.feature.Feature;
import com.example.checkin.feature.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Field;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClassroomService {

    private final ClassroomRepository classroomRepository;
    private final FeatureRepository featureRepository;

    @Autowired
    public ClassroomService(ClassroomRepository classroomRepository, FeatureRepository featureRepository) {
        this.classroomRepository = classroomRepository;
        this.featureRepository = featureRepository;
    }

//    public void addClassroom(Classroom classroom) {
//        Optional<Classroom> classroomOptional = classroomRepository.findClassroomByName(classroom.getName());
//        if (classroomOptional.isPresent()) {
//            throw new IllegalStateException("Classroom with name: " + classroom.getName() + " already exists");
//        }
//        classroomRepository.save(classroom);
//    }

    public void addClassroom(Classroom classroom) {
        Classroom classroomToSave = new Classroom();

        Optional<Classroom> classroomOptional = classroomRepository.findClassroomByName(classroom.getName());
        if (classroomOptional.isPresent()){
            throw new IllegalStateException("Classroom with name: " + classroom.getName() + " already exists");
        }

        classroomToSave.setName(classroom.getName());
        classroomToSave.setLocation(classroom.getLocation());
        classroomToSave.setCapacity(classroom.getCapacity());

        Set<Feature> features = classroom.getFeatures();
        for (Feature feature : features) {
            Optional<Feature> featureOptional = featureRepository.findFeatureByName(feature.getName());
            if (featureOptional.isPresent()){
                classroomToSave.assignFeature(featureOptional.get());
            } else {
                System.out.println("feature doesnt exist");
            }
        }

        classroomRepository.save(classroomToSave);
    }

//    public void assignFeatureToClassroom(Long classroomId, Feature feature){
//        Classroom classroom = classroomRepository.findClassroomById(classroomId).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Classroom with id: " + classroomId + " not found!")
//        );
//        Optional<Feature> featureOptional = featureRepository.findFeatureByName(feature.getName());
//        if (featureOptional.isEmpty()){
//            featureRepository.save(feature);
//            classroom.assignFeature(feature);
//        }
//        else {
//            classroom.assignFeature(featureOptional.get());
//        }
//        classroomRepository.save(classroom);
//    }

    public void deleteClassroom(Long id){
        if (classroomRepository.existsById(id)){
            classroomRepository.deleteClassroomById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Classroom with id: " + id + " not found!");
        }
    }

    public Classroom findClassroomById(Long id){
        return  classroomRepository.findClassroomById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Classroom with id: " + id + " not found!")
        );
    }

    public List<Classroom> findAllClassrooms(){
        return classroomRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }


    public void updateClassroom(Long id, Classroom updatedClassroom){
        Classroom classroom = classroomRepository.findClassroomById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Classroom with id: " + id + " not found!")
        );
        if (updatedClassroom.getName() != null && !(updatedClassroom.getName().equals(classroom.getName()))){
            classroom.setName(updatedClassroom.getName());
        }
        if (updatedClassroom.getLocation() != null && !(updatedClassroom.getLocation().equals(classroom.getLocation()))){
            classroom.setLocation(updatedClassroom.getLocation());
        }
        if (updatedClassroom.getCapacity() != null && !(updatedClassroom.getCapacity().equals(classroom.getCapacity()))){
            classroom.setCapacity(updatedClassroom.getCapacity());
        }

        if (updatedClassroom.getFeatures() != null && !(updatedClassroom.getFeatures().equals(classroom.getFeatures()))) {
            classroom.removeAllFeatures();
            Set<Feature> features = updatedClassroom.getFeatures();
            for (Feature feature : features) {
                Optional<Feature> featureOptional = featureRepository.findFeatureByName(feature.getName());
                if (featureOptional.isPresent()) {
                    classroom.assignFeature(featureOptional.get());
                } else {
                    System.out.println("feature doesnt exist");
                }
            }
        }
        classroomRepository.save(classroom);
    }

    public Set<String> getClassroomFeatures(Long classroomId){
        Set<String> features = new HashSet<>();
        Classroom classroom = classroomRepository.findClassroomById(classroomId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Classroom with id: "+ classroomId + " not found!")
        );
        for (Feature feature: classroom.getFeatures()){
            features.add(feature.getName());
        }
        return features;
    }

    public ClassroomDTO mapEntityToDto(Classroom classroom){
        ClassroomDTO classroomDto = new ClassroomDTO();
        classroomDto.setId(classroom.getId());
        classroomDto.setName(classroom.getName());
        classroomDto.setCapacity(classroom.getCapacity());
        return classroomDto;
    }

    public List<ClassroomDTO> mapEntitiesToDTO(List<Classroom> classrooms){
        return classrooms.stream().map(this::mapEntityToDto).collect(Collectors.toList());
    }

    public void assignFeatureToClassroom(Long classroomId, Feature feature){
        Classroom classroom = classroomRepository.findClassroomById(classroomId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Classroom with id: " + classroomId + " not found!")
        );
        Optional<Feature> featureOptional = featureRepository.findFeatureByName(feature.getName());
        if (featureOptional.isEmpty()){
            featureRepository.save(feature);
            classroom.assignFeature(feature);
        }
        else {
            classroom.assignFeature(featureOptional.get());
        }
        classroomRepository.save(classroom);
    }

    public void partialUpdateClassroom(Long classroomId, Map<String, Object> request) {
        Classroom classroom = classroomRepository.findClassroomById(classroomId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Classroom with id: " + classroomId + " not found!")
        );
        request.forEach((k,v) -> {
            Field field = ReflectionUtils.findField(Classroom.class, k);
            if (field != null){
                field.setAccessible(true);
                ReflectionUtils.setField(field, classroom, v);
            }
        });
        classroomRepository.save(classroom);
    }
}