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
    Optional<User> findByUser_UserId(Long userId);
    boolean existsByUser_UserId(Long userId);
    
    @Query("SELECT a FROM Alumni a JOIN a.user u WHERE " +
           "(:designation IS NULL OR LOWER(a.designation) LIKE LOWER(CONCAT('%', :designation, '%'))) AND " +
           "(:location IS NULL OR LOWER(a.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:yoe IS NULL OR a.yoe = :yoe) AND " +
           "(:degree IS NULL OR LOWER(u.degree) LIKE LOWER(CONCAT('%', :degree, '%'))) AND " +
           "(:currentCompany IS NULL OR LOWER(a.currentCompany) LIKE LOWER(CONCAT('%', :currentCompany, '%'))) AND " +
           "(:searchByName IS NULL OR LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT('%', :searchByName, '%')))")
    List<Alumni> findAlumniByFilters(
        @Param("designation") String designation,
        @Param("location") String location,
        @Param("yoe") Integer yoe,
        @Param("degree") String degree,
        @Param("currentCompany") String currentCompany,
        @Param("searchByName") String searchByName
    );
}