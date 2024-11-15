import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlumniCard from "./AlumniCard";
import Pagination from "../common/Pagination";
import { fetchAlumni } from "../../redux/actions/alumniActions";
import "../../css/alumniPage.css";

const AlumniPage = () => {
  const dispatch = useDispatch();
  const { alumni, totalPages } = useSelector((state) => state.alumni);
  const [filters, setFilters] = useState({ designation: "", location: "", yoe: "", company: "", department: "" });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAlumni({ page: currentPage, ...filters }));
  }, [dispatch, currentPage, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  return (
    <div className="alumni-page container">
      <div className="filter-options">
        {["designation", "location", "yoe", "company", "department"].map((filter) => (
          <input
            key={filter}
            type="text"
            name={filter}
            placeholder={`Filter by ${filter}`}
            value={filters[filter]}
            onChange={handleFilterChange}
          />
        ))}
      </div>

      <div className="alumni-cards">
        {alumni.map((alumnus) => (
          <AlumniCard key={alumnus.AlumniID} alumni={alumnus} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AlumniPage;
