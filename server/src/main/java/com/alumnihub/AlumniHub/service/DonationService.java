package com.alumnihub.AlumniHub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumnihub.AlumniHub.model.Donation;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.DonationRepository;

import jakarta.transaction.Transactional;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private NotificationService notificationService; // Inject NotificationService

    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    public Optional<Donation> getDonationById(Long donationId) throws Exception {
        Optional<Donation> donation = donationRepository.findById(donationId);
        if (donation.isPresent())
            return donation;
        else {
            throw new RuntimeException("No such donation exists");
        }
    }

    public List<Donation> getMyDonations(User user) {
        return donationRepository.findAllDonationsByUser(user);
    }

    @Transactional
    public Donation createDonation(Donation donation) {
        Donation savedDonation = donationRepository.save(donation);

        // Automatically send notification after successful donation
        String title = "Donation Received";
        String description = "Thank you for your generous donation of ₹" + savedDonation.getAmount() + ".";

        // Use notificationService to send notification
        notificationService.sendNotificationToUser(savedDonation.getUser(), title, description);

        return savedDonation;
    }
}
