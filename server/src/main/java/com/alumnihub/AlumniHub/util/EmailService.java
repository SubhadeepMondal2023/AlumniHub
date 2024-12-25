package com.alumnihub.AlumniHub.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private final Random random = new Random();

    // Sender's email address (make sure this is valid)
    private static final String FROM_EMAIL = "bhargavprasadas007@gmail.com"; 

    // Method to send OTP email
    public String sendOtpEmail(String toEmail) {
        String otp = generateOtp();

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);  // Ensure this is a valid sender address
            message.setTo(toEmail);
            message.setSubject("Your OTP for AlumniHub");
            message.setText("Your OTP is: " + otp + "\n\nThis OTP is valid for 10 minutes.");

            // Send the email
            mailSender.send(message);
            return otp;  // Return OTP for validation purposes
        } catch (Exception e) {
            // Log the error and rethrow or handle accordingly
            System.err.println("Error sending OTP email: " + e.getMessage());
            throw new RuntimeException("Failed to send OTP email: " + e.getMessage(), e);
        }
    }

    // Method to generate a 6-digit OTP
    private String generateOtp() {
        int otp = 100000 + random.nextInt(900000);  // Generates a 6-digit OTP
        return String.valueOf(otp);
    }
}
