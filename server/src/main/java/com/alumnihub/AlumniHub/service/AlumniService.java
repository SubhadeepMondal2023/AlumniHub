package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.model.Alumni;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.exception.ResourceNotFoundException;
import com.alumnihub.AlumniHub.repository.AlumniRepository;
import com.alumnihub.AlumniHub.repository.UserRepository;
import com.alumnihub.AlumniHub.util.AlumniSpecifications;
import org.springframework.data.jpa.domain.Specification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AlumniService {

    @Autowired
    private AlumniRepository alumniRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Alumni> getAllAlumni() {
        return alumniRepository.findAll();
    }

    public Alumni getAlumniById(Integer alumniId) {
        return alumniRepository.findById(alumniId)
                .orElseThrow(() -> new ResourceNotFoundException("Alumni not found with id: " + alumniId));
    }

    public Alumni getAlumniByUserId(Integer userId) {
        return alumniRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Alumni not found for user id: " + userId));
    }

    public Alumni createAlumni(Alumni alumni) {
        User user = userRepository.findById(alumni.getUser().getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (alumniRepository.existsByUser_UserId(user.getUserId())) {
            throw new IllegalArgumentException("Alumni profile already exists for this user");
        }

        return alumniRepository.save(alumni);
    }

    public Alumni updateAlumni(Integer alumniId, Alumni alumniDetails) {
        Alumni alumni = getAlumniById(alumniId);

        alumni.setPhone(alumniDetails.getPhone());
        alumni.setAddress(alumniDetails.getAddress());
        alumni.setLinkedInProfile(alumniDetails.getLinkedInProfile());
        alumni.setCurrentCompany(alumniDetails.getCurrentCompany());
        alumni.setDesignation(alumniDetails.getDesignation());
        alumni.setLocation(alumniDetails.getLocation());

        return alumniRepository.save(alumni);
    }

    public boolean deleteAlumni(Integer alumniId) {
        if (!alumniRepository.existsById(alumniId)) {
            throw new ResourceNotFoundException("Alumni not found with id: " + alumniId);
        }
        alumniRepository.deleteById(alumniId);
        return true; // Return true indicating successful deletion
    }

    public List<Alumni> searchAlumni(String location, String company) {
        Specification<Alumni> spec = Specification.where(null); // Start with a null specification
    
        if (location != null) {
            spec = spec.and(AlumniSpecifications.locationContains(location));
        }
        if (company != null) {
            spec = spec.and(AlumniSpecifications.companyContains(company));
        }
    
        return alumniRepository.findAll(spec);
    }
    
}
