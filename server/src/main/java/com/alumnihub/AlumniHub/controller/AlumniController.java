package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.exception.NotFoundException;
import com.alumnihub.AlumniHub.model.Alumni;
import com.alumnihub.AlumniHub.service.AlumniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alumni")
public class AlumniController {

    @Autowired
    private AlumniService alumniService;

    // GET /alumni - Get all alumni
    @GetMapping
    public ResponseEntity<List<Alumni>> getAllAlumni(@RequestParam(required = false) String location,
                                                      @RequestParam(required = false) String company) {
        List<Alumni> alumniList = alumniService.getAllAlumni();
        return new ResponseEntity<>(alumniList, HttpStatus.OK);
    }

    // GET /alumni/{alumniId} - Get specific alumni profile by ID
    @GetMapping("/{alumniId}")
    public ResponseEntity<Alumni> getAlumniById(@PathVariable Integer alumniId) {
        Alumni alumni = alumniService.getAlumniById(alumniId);
        if (alumni == null) {
            throw new NotFoundException("Alumni not found");
        }
        return new ResponseEntity<>(alumni, HttpStatus.OK);
    }

    // POST /alumni - Create alumni entry
    @PostMapping
    public ResponseEntity<Alumni> createAlumni(@RequestBody Alumni alumni) {
        Alumni newAlumni = alumniService.createAlumni(alumni);
        return new ResponseEntity<>(newAlumni, HttpStatus.CREATED);
    }

    // PUT /alumni/{alumniId} - Update alumni details
    @PutMapping("/{alumniId}")
    public ResponseEntity<Alumni> updateAlumni(@PathVariable Integer alumniId, @RequestBody Alumni alumniDetails) {
        Alumni updatedAlumni = alumniService.updateAlumni(alumniId, alumniDetails);
        if (updatedAlumni == null) {
            throw new NotFoundException("Alumni not found");
        }
        return new ResponseEntity<>(updatedAlumni, HttpStatus.OK);
    }

    // DELETE /alumni/{alumniId} - Delete alumni profile
    @DeleteMapping("/{alumniId}")
    public ResponseEntity<Void> deleteAlumni(@PathVariable Integer alumniId) {
        boolean isDeleted = alumniService.deleteAlumni(alumniId);
        if (!isDeleted) {
            throw new NotFoundException("Alumni not found");
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}