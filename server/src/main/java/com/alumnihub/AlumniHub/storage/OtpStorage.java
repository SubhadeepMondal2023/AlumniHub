package com.alumnihub.AlumniHub.storage;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpStorage {

    private final ConcurrentHashMap<String, OtpDetails> otpStore = new ConcurrentHashMap<>();

    public void storeOtp(String email, String otp) {
        otpStore.put(email, new OtpDetails(otp, LocalDateTime.now().plusMinutes(10))); // Expires in 10 minutes
    }

    public String getOtp(String email) {
        OtpDetails details = otpStore.get(email);
        if (details != null && LocalDateTime.now().isBefore(details.getExpiry())) {
            return details.getOtp();
        }
        return null; // OTP expired or not found
    }

    public void removeOtp(String email) {
        otpStore.remove(email);
    }

    private static class OtpDetails {
        private final String otp;
        private final LocalDateTime expiry;

        public OtpDetails(String otp, LocalDateTime expiry) {
            this.otp = otp;
            this.expiry = expiry;
        }

        public String getOtp() {
            return otp;
        }

        public LocalDateTime getExpiry() {
            return expiry;
        }
    }
}

