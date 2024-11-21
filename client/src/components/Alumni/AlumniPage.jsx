import React, { useState } from "react";
import { useFetchAlumniQuery, useDeleteAlumniMutation } from "../../redux/api/alumniApiSlice";
import AlumniCard from "./AlumniCard";
import Pagination from "../common/Pagination";
import "../../css/alumniPage.css";

const AlumniPage = () => {
  const [filters, setFilters] = useState({ designation: "", location: "", yoe: "", company: "", department: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching, isError } = useFetchAlumniQuery({ page: currentPage, ...filters });
  const [deleteAlumni] = useDeleteAlumniMutation();

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handleDelete = async (alumniId) => {
    const optimisticAlumni = data.alumni.filter((a) => a.AlumniID !== alumniId);

    // Optimistically update the UI
    try {
      await deleteAlumni(alumniId).unwrap();
    } catch (error) {
      alert("Failed to delete alumni. Reverting...");
    }
  };

  if (isError) return <div>Error fetching alumni data.</div>;
  if (isFetching) return <div>Loading...</div>;

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
        {data?.alumni.map((alumnus) => (
          <AlumniCard key={alumnus.AlumniID} alumni={alumnus} onDelete={() => handleDelete(alumnus.AlumniID)} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AlumniPage;
