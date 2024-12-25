package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.exception.NotFoundException;
import com.alumnihub.AlumniHub.model.Alumni;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.AlumniRepository;
import com.alumnihub.AlumniHub.repository.UserRepository;
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
        if (alumni == null || alumni.getUser().getUserId() == null) {
            throw new IllegalArgumentException("Invalid alumni or user data provided");
        }
    
        User user = userRepository.findById(alumni.getUser().getUserId())
                .orElseThrow(() -> new NotFoundException("User not found"));
    
        if (alumniRepository.existsByUser_UserId(user.getUserId())) {
            throw new IllegalArgumentException("Alumni profile already exists for this user");
        }
    
        alumni.setUser(user);
        return alumniRepository.save(alumni);
    }

    public List<Alumni> getAllAlumni(String designation, String location, Integer yoe, 
                                   String degree, String currentCompany, String searchByName) {
        if (isNoFilterApplied(designation, location, yoe, degree, currentCompany, searchByName)) {
            List<Alumni> results = alumniRepository.findAll();
            log.info("Fetching all alumni without filters. Found {} records", results.size());
            return results;
        }

        List<Alumni> results = alumniRepository.findAlumniByFilters(designation, location, yoe, 
                                                                  degree, currentCompany, searchByName);
        log.info("Fetching alumni with filters - designation: {}, location: {}, YoE: {}, degree: {}, " +
                "company: {}, name: {}. Found {} records", 
                designation, location, yoe, degree, currentCompany, searchByName, results.size());
        return results;
    }

    public List<Alumni> searchAlumni(String designation, String location, Integer yoe, 
                                   String degree, String currentCompany, String searchByName) {
        return alumniRepository.findAlumniByFilters(designation, location, yoe, 
                                                  degree, currentCompany, searchByName);
    }

    private boolean isNoFilterApplied(String designation, String location, Integer yoe, 
                                    String degree, String currentCompany, String searchByName) {
        return designation == null && location == null && yoe == null && 
               degree == null && currentCompany == null && searchByName == null;
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
                    updateAlumniFields(alumni, alumniDetails);
                    return alumniRepository.save(alumni);
                });
    }

    private void updateAlumniFields(Alumni alumni, Alumni alumniDetails) {
        alumni.setPhone(alumniDetails.getPhone());
        alumni.setAddress(alumniDetails.getAddress());
        alumni.setLinkedInProfile(alumniDetails.getLinkedInProfile());
        alumni.setCurrentCompany(alumniDetails.getCurrentCompany());
        alumni.setDesignation(alumniDetails.getDesignation());
        alumni.setLocation(alumniDetails.getLocation());
        alumni.setYoe(alumniDetails.getYoe());
    }

    public boolean alumniExistsByUserId(Long userId) {
        return alumniRepository.existsByUser_UserId(userId);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
}