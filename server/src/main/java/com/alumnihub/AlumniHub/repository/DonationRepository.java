package com.alumnihub.AlumniHub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.alumnihub.AlumniHub.model.Donation;
import com.alumnihub.AlumniHub.model.User;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long>{
    
    //Finds all the donations made by an user, i.e donation history
    @Query("SELECT d FROM Donation d WHERE d.user = :user")
    List<Donation> findAllDonationsByUser(@Param("user") User user);

    
}
