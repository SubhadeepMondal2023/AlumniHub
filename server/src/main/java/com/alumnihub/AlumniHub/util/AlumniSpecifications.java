package com.alumnihub.AlumniHub.util;

import com.alumnihub.AlumniHub.model.Alumni;
import org.springframework.data.jpa.domain.Specification;

public class AlumniSpecifications {

    public static Specification<Alumni> buildSearchSpecification(String location, String company) {
        Specification<Alumni> spec = Specification.where(null);

        if (location != null && !location.isEmpty()) {
            spec = spec.and(locationContains(location));
        }

        if (company != null && !company.isEmpty()) {
            spec = spec.and(companyContains(company));
        }

        return spec;
    }

    public static Specification<Alumni> locationContains(String location) {
        return (root, query, cb) ->
            cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%");
    }

    public static Specification<Alumni> companyContains(String company) {
        return (root, query, cb) ->
            cb.like(cb.lower(root.get("currentCompany")), "%" + company.toLowerCase() + "%");
    }
}
