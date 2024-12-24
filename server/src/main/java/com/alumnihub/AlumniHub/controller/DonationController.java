package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.model.Donation;
import com.alumnihub.AlumniHub.service.DonationService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RequestMapping("/donations")
@CrossOrigin
@RestController
public class DonationController
{
    @Autowired
    private DonationService donationService;

    @GetMapping
    public ResponseEntity<?> getAllDonations(){
        try{
            Map<String, Object> map = Map.of("success", true, "data", donationService.getAllDonations());
            return ResponseEntity.status(HttpStatus.OK).body(map);
        }
        catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @GetMapping("/{donationId}")
    public ResponseEntity<?> getDonationById(@PathVariable Long donationId) {
        try{
            Optional<Donation> donation=donationService.getDonationById(donationId);
            if(donation.isPresent())
            {
                Map<String, Object> map = Map.of("success", true, "data", donation.get());
                return ResponseEntity.status(HttpStatus.OK).body(map);
                // return (new ResponseEntity<>(donation, HttpStatus.OK));
            }
            else
            {
                Map<String, Object> map = Map.of("success", false, "message", "Event not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            }
        }
        catch (Exception e)
        {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }
    @GetMapping("/history/{userId}")
    public ResponseEntity<?> getDonationHistory(@PathVariable Long userId){
        try{
            Map<String, Object> map = Map.of("success", true, "data", donationService.getMyDonations(userId));
                return ResponseEntity.status(HttpStatus.OK).body(map);
        }
        catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }
    @PostMapping
    public ResponseEntity<?> addDonations(@RequestBody Donation donation){
        try{
            Donation newDonation=donationService.createDonation(donation);
            Map<String, Object> map=Map.of("success",true, "data", newDonation);
            return ResponseEntity.status(HttpStatus.CREATED).body(map);
        }catch(Exception e)
        {
            Map<String, Object> map=Map.of("success",false,"data",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }
    
}