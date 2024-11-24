package com.alumnihub.AlumniHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.alumnihub.AlumniHub.model.Alumni;
import com.alumnihub.AlumniHub.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumniRepository extends JpaRepository<Alumni, Long>, JpaSpecificationExecutor<Alumni> {
    // Existing methods
    Optional<User> findByUser_UserId(Long userId);
    boolean existsByUser_UserId(Long userId);
    List<Alumni> findByLocationContainingIgnoreCase(String location);
    List<Alumni> findByCurrentCompanyContainingIgnoreCase(String company);

    // New methods
    List<Alumni> findByYoeBetween(Integer minYoe, Integer maxYoe);
    
    @Query("SELECT a FROM Alumni a JOIN a.user u WHERE u.industry LIKE %:industry%")
    List<Alumni> findByUserIndustryContainingIgnoreCase(@Param("industry") String industry);
    
    // Combined search with all parameters
    @Query("SELECT a FROM Alumni a JOIN a.user u WHERE " +
           "(:location IS NULL OR LOWER(a.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:company IS NULL OR LOWER(a.currentCompany) LIKE LOWER(CONCAT('%', :company, '%'))) AND " +
           "(:minYoe IS NULL OR a.yoe >= :minYoe) AND " +
           "(:maxYoe IS NULL OR a.yoe <= :maxYoe) AND " +
           "(:industry IS NULL OR LOWER(u.industry) LIKE LOWER(CONCAT('%', :industry, '%')))")
    List<Alumni> findAlumniByFilters(
        @Param("location") String location,
        @Param("company") String company,
        @Param("minYoe") Integer minYoe,
        @Param("maxYoe") Integer maxYoe,
        @Param("industry") String industry
    );
}