import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../../css/alumniList.css";
import AlumniCard from "../Alumni/AlumniCard.jsx";
const alumniList = [
  {
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    name: "Emily Patel",
    bio: "Graduate of Mechanical Engineering, Batch of 2022",
    department: "Mechanical Engineering",
    job: "Design Engineer at InnovateTech",
    skills: "SolidWorks, CAD, FEA",
  },
  {
    img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    name: "Ryan Thompson",
    bio: "Graduate of Civil Engineering, Batch of 2021",
    department: "Civil Engineering",
    job: "Structural Engineer at SkyBuild",
    skills: "Autodesk, Revit, STAAD",
  },
  {
    img: "https://images.pexels.com/photos/3182743/pexels-photo-3182743.jpeg",
    name: "Sophia Rodriguez",
    bio: "Graduate of Biotechnology, Batch of 2017",
    department: "Biotechnology",
    job: "Research Scientist at BioGen",
    skills: "Molecular Biology, PCR, Microscopy",
  },
  {
    img: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
    name: "Michael Lee",
    bio: "Graduate of Aerospace Engineering, Batch of 2016",
    department: "Aerospace Engineering",
    job: "Aerodynamics Engineer at AeroTech",
    skills: "CFD, Finite Element Analysis, MATLAB",
  },
  {
    img: "https://images.pexels.com/photos/936120/pexels-photo-936120.jpeg",
    name: "Isabella Martin",
    bio: "Graduate of Environmental Engineering, Batch of 2023",
    department: "Environmental Engineering",
    job: "Sustainability Consultant at GreenEarth",
    skills: "Water Treatment, Air Quality, GIS",
  },
  {
    img: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
    name: "Daniel Kim",
    bio: "Graduate of Chemical Engineering, Batch of 2015",
    department: "Chemical Engineering",
    job: "Process Engineer at ChemCorp",
    skills: "Process Simulation, ASPEN, HAZOP",
  },
  
];

const AlumniList = () => {
	return (
		<section className="alumni-list-section light">
			<Container>
				<h1 className="alumni-heading mb-5 text-center">Our Distinguished Alumni</h1>

				<Row>
					{alumniList.map((alumni, i) => (
						<Col xs={12} md={6} lg={4} className="mb-4" key={i}>
							<AlumniCard alumni={alumni} />
						</Col>
					))}
				</Row>
			</Container>
		</section>
	);
};

export default AlumniList;
