package com.alumnihub.AlumniHub.util;

import com.alumnihub.AlumniHub.model.JobPost;
import org.springframework.data.jpa.domain.Specification;

public class JobPostSpecifications {

    public static Specification<JobPost> buildSearchSpecification(String jobTitle, String company, String location) {
        return (root, query, criteriaBuilder) -> {
            Specification<JobPost> spec = Specification.where(null);

            if (jobTitle != null && !jobTitle.trim().isEmpty()) {
                spec = spec.and((root1, query1, criteriaBuilder1) ->
                        criteriaBuilder1.like(criteriaBuilder1.lower(root1.get("jobTitle")),
                                "%" + jobTitle.toLowerCase() + "%"));
            }

            if (company != null && !company.trim().isEmpty()) {
                spec = spec.and((root1, query1, criteriaBuilder1) ->
                        criteriaBuilder1.like(criteriaBuilder1.lower(root1.get("company")),
                                "%" + company.toLowerCase() + "%"));
            }

            if (location != null && !location.trim().isEmpty()) {
                spec = spec.and((root1, query1, criteriaBuilder1) ->
                        criteriaBuilder1.like(criteriaBuilder1.lower(root1.get("location")),
                                "%" + location.toLowerCase() + "%"));
            }

            return spec.toPredicate(root, query, criteriaBuilder);
        };
    }
}