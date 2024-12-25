package com.alumnihub.AlumniHub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumnihub.AlumniHub.model.Donation;
import com.alumnihub.AlumniHub.repository.DonationRepository;

@Service
public class DonationService
{
    @Autowired
    private DonationRepository donationRepository;

    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    public Optional<Donation> getDonationById(Long donationId) throws Exception {
        Optional<Donation> donation=donationRepository.findById(donationId);
        if(donation.isPresent())
        return donation;
        else{
            throw new RuntimeException("No such donation exists");
        }
    }

    public List<Donation> getMyDonations(Long userId) {
        return donationRepository.findAllDonationsByUserId(userId);
    }

    public Donation createDonation(Donation donation){
        return donationRepository.save(donation);
    }

}