package com.alumnihub.AlumniHub.util;

import com.alumnihub.AlumniHub.model.JobPost;
import org.springframework.data.jpa.domain.Specification;

public class JobPostSpecifications {

    public static Specification<JobPost> buildSearchSpecification(String jobTitle, String company, String location) {
        return Specification.where(hasJobTitle(jobTitle))
                .and(hasCompany(company))
                .and(hasLocation(location));
    }

    private static Specification<JobPost> hasJobTitle(String jobTitle) {
        return (root, query, criteriaBuilder) -> {
            if (jobTitle == null || jobTitle.trim().isEmpty()) {
                return criteriaBuilder.isTrue(criteriaBuilder.literal(true));
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("jobTitle")), "%" + jobTitle.toLowerCase() + "%");
        };
    }

    private static Specification<JobPost> hasCompany(String company) {
        return (root, query, criteriaBuilder) -> {
            if (company == null || company.trim().isEmpty()) {
                return criteriaBuilder.isTrue(criteriaBuilder.literal(true));
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("company")), "%" + company.toLowerCase() + "%");
        };
    }

    private static Specification<JobPost> hasLocation(String location) {
        return (root, query, criteriaBuilder) -> {
            if (location == null || location.trim().isEmpty()) {
                return criteriaBuilder.isTrue(criteriaBuilder.literal(true));
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("location")), "%" + location.toLowerCase() + "%");
        };
    }
}