/*
 NOTE THIS FILE IS NOT MANDATORY
 IT WILL BE USED IN CASE NEEDED TO MODIFY THE SERACH ALUMNI BASED ON FILTERS.
 */


package com.alumnihub.AlumniHub.util;

import com.alumnihub.AlumniHub.model.Alumni;
import org.springframework.data.jpa.domain.Specification;


public class AlumniSpecifications {
    
    public static Specification<Alumni> buildSearchSpecification(String location, String company) {
        return (root, query, criteriaBuilder) -> {
            Specification<Alumni> spec = Specification.where(null);
            
            if (location != null && !location.trim().isEmpty()) {
                spec = spec.and((root1, query1, criteriaBuilder1) ->
                    criteriaBuilder1.like(criteriaBuilder1.lower(root1.get("location")), 
                        "%" + location.toLowerCase() + "%"));
            }
            
            if (company != null && !company.trim().isEmpty()) {
                spec = spec.and((root1, query1, criteriaBuilder1) ->
                    criteriaBuilder1.like(criteriaBuilder1.lower(root1.get("currentCompany")), 
                        "%" + company.toLowerCase() + "%"));
            }
            
            return spec.toPredicate(root, query, criteriaBuilder);
        };
    }
}
