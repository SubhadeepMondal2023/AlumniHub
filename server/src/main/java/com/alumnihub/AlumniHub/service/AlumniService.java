package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.exception.NotFoundException;
import com.alumnihub.AlumniHub.model.Alumni;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.AlumniRepository;
import com.alumnihub.AlumniHub.repository.UserRepository;
import com.alumnihub.AlumniHub.util.AlumniSpecifications;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class AlumniService {

    @Autowired
    private AlumniRepository alumniRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<Alumni> getAlumniById(Long alumniId) {
        return alumniRepository.findById(alumniId);
    }

    public Alumni createAlumni(Alumni alumni) {
        // Validate input
        if (alumni == null  || alumni.getUser().getUserId() == null) {
            throw new IllegalArgumentException("Invalid alumni or user data provided");
        }
    
        // Retrieve user
        User user = userRepository.findById(alumni.getUser().getUserId())
                .orElseThrow(() -> new NotFoundException("User not found"));
    
        // Check for existing alumni
        if (alumniRepository.existsByUser_UserId(user.getUserId())) {
            throw new IllegalArgumentException("Alumni profile already exists for this user");
        }
    
        // Link the validated user to the alumni entity
        alumni.setUser(user);
    
        // Save and return the new alumni profile
        return alumniRepository.save(alumni);
    }
    

    public List<Alumni> getAllAlumni(String location, String company) {
        List<Alumni> results;
        if (location == null && company == null) {
            results = alumniRepository.findAll();
            log.info("Fetching all alumni without filters. Found {} records", results.size());
        } else {
            results = alumniRepository.findAll(AlumniSpecifications.buildSearchSpecification(location, company));
            log.info("Fetching alumni with filters - location: {}, company: {}. Found {} records", 
                location, company, results.size());
        }
        return results;
    }

    public boolean deleteAlumni(Long alumniId) {
        if (!alumniRepository.existsById(alumniId)) {
            return false;
        }
        alumniRepository.deleteById(alumniId);
        return true;
    }

    public Optional<Alumni> updateAlumni(Long alumniId, Alumni alumniDetails) {
        return alumniRepository.findById(alumniId)
                .map(alumni -> {
                    alumni.setPhone(alumniDetails.getPhone());
                    alumni.setAddress(alumniDetails.getAddress());
                    alumni.setLinkedInProfile(alumniDetails.getLinkedInProfile());
                    alumni.setCurrentCompany(alumniDetails.getCurrentCompany());
                    alumni.setDesignation(alumniDetails.getDesignation());
                    alumni.setLocation(alumniDetails.getLocation());
                    return alumniRepository.save(alumni);
                });
    }

    public boolean alumniExistsByUserId(Long userId) {
        return alumniRepository.existsByUser_UserId(userId);
    }


    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
}