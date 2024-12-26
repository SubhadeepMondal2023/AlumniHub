import React from 'react';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'; 
import TeamCard from '../Alumni/TeamCard';
import subhadeep from '../../assets/images/subhadeep.jpg';
import debasree from '../../assets/images/debasree.jpg';
import tatha from '../../assets/images/tatha.jpg';
import deep from '../../assets/images/deep.jpg';
import bhargav from '../../assets/images/bhargav.jpg';
import ishani from '../../assets/images/ishani.jpg';

const teamData = [
    {
        image: deep,
        subHeading: "MERN Stack Developer, BTech IT, University of Calcutta",
        imageName: "Deep Ghosal",
        intro: "I contributed to the AlumniHub project, focusing on the frontend development using React. My contributions ensured a robust and scalable frontend architecture, effectively integrating it with the backend for a seamless application workflow.",
        contribution: [
            "Created reusable components and implemented seamless communication using RTK Query.",
            "Optimized performance through lazy loading and caching mechanisms.",
            "Ensured robust and scalable frontend architecture with backend integration."
        ],
        socialLinks: [
            { icon: faLinkedin, href: "https://www.linkedin.com/in/deep-ghosal-53752a255" },
            { icon: faGithub, href: "https://github.com/deepcu-it" },
        ],
        infoList: [
            { label: "Location", value: "Kolkata, India" },
            { label: "Phone", value: "+91 79803 46689" },
        ]
    },
    {
        image: subhadeep,
        subHeading: "Backend Developer, BTech IT, University of Calcutta",
        imageName: "Subhadeep Mondal",
        intro: "I am a BTech IT student with expertise in the MERN stack and Java Spring Boot, passionate about building innovative solutions. An eager learner, I thrive on exploring new technologies and enhancing my skills in the ever-evolving tech landscape.",
        contribution: [
            "In the AlumniHub project, I managed the backend for alumni, job posts, and job applications, implementing robust filter options for enhanced functionality.",
            "Additionally, I designed the group feature frontend and collaborated with teammates by resolving backend issues and ensuring seamless integration."
        ],
        socialLinks: [
            { icon: faLinkedin, href: "https://www.linkedin.com/in/subhadeep-mondal-174923243" },
            { icon: faGithub, href: "https://github.com/SubhadeepMondal2023" },
        ],
        infoList: [
            { label: "Location", value: "Kolkata, India" },
            { label: "Phone", value: "+91 81011 65244" },
        ]
    },
    {
        image: ishani,
        subHeading: "Backend Developer, BTech IT, University of Calcutta",
        imageName: "Ishani Sen",
        intro: "As a passionate BTech student with a strong interest in backend development, I have successfully developed and implemented key backend functionalities using Java Spring Boot, focusing on the Donation and Notification systems.",
        contribution: [
            "Handling donation history for user tracking and enabling event-specific donations to support targeted initiatives.",
            "Implementing mechanisms to retrieve detailed donation records for transparency",
            "Creating notifications dynamically based on user activities, fetching notifications by ID.",
            "Adding functionality to mark notifications as read, enhancing user experience."
        ],
        socialLinks: [
            { icon: faLinkedin, href: "https://www.linkedin.com/in/ishani-sen-4157ab225" },
            { icon: faGithub, href: "https://github.com/IshaniSen2612" },
        ],
        infoList: [
            { label: "Location", value: "Kolkata, India" },
            { label: "Phone", value: "+91 6291 688 499" },
        ]
    }, 
    {
        image: debasree,
        subHeading: "Frontend Developer, BTech IT, University of Calcutta",
        imageName: "Debasree Nath",
        intro: "I am a BTech IT student with expertise in Frontend Development using React js. As a passionate learner, I am constantly exploring new technologies and honing my skills to stay ahead in the fast-paced world of tech.",
        contribution: [
            "Designed and implemented the database structure to ensure efficient storage and retrieval of data.",
            "Developed the Notification List feature, allowing users to view and filter notifications effectively.",
            "Created the All Alumni page with advanced filtering options for seamless search and navigation.",
            "Built the FAQ and About Us sections to provide valuable user information and addressing common queries."
        ],
        socialLinks: [
            { icon: faLinkedin, href: "https://www.linkedin.com/in/debasree-nath-a8758b26a" },
            { icon: faGithub, href: "https://github.com/DebasreeNath48" },
        ],
        infoList: [
            { label: "Location", value: "Kolkata, India" },
            { label: "Phone", value: "+91 9903 703 278" },
        ]
    },
    {
        image: bhargav,
        subHeading: "Software Developer, BTech IT, University of Calcutta",
        imageName: "Bhargav Prasad Das",
        intro: "Hi, I'm Bhargav, a software developer passionate about backend development and building efficient systems. I made significant contributions to the backend of AlumniHub, designing robust APIs for user authentication, profile management, and secure account operations. My work focused on role-based access control, clean architecture, and delivering seamless user experiences.",
        contribution: [
            "Designed APIs for user authentication, profile management, and secure account operations.",
            "Implemented role-based access control and clean architecture for a seamless user experience."
        ],
        socialLinks: [
            { icon: faLinkedin, href: "https://www.linkedin.com/in/bhargav-prasad-das-328409256" },
            { icon: faGithub, href: "https://github.com/Bhargav-Techin" },
        ],
        infoList: [
            { label: "Location", value: "Kolkata, India" },
            { label: "Phone", value: "+91 6291 723 231" },
        ]
    },
    {
        image: tatha,
        subHeading: "Frontend Developer, BTech IT, University of Calcutta",
        imageName: "Tathagata De",
        intro: "Hello! I am Tathagata, an undergraduate student currently delving into the dynamic world of frontend development as part of an exciting project called AlumniHub. In my journey as a frontend developer, I've developed proficiency in technologies such as HTML, CSS, JavaScript, and React. My goal is to design a seamless platform that makes it easy for alumni to stay in touch and support each other's professional growth.",
        contribution: [
            "Developed visually appealing and user-friendly event and job pages.",
            "Ensured seamless design for fostering alumni connections and professional growth."
        ],
        socialLinks: [
            { icon: faLinkedin, href: "https://www.linkedin.com/in/tathagata-de-652bb9253" },
            { icon: faGithub, href: "https://github.com/Soy-Tathagata" },
        ],
        infoList: [
            { label: "Location", value: "Kolkata, India" },
            { label: "Phone", value: "+91 79082 05612" },
        ]
    }
];

const TheTeam = () => {
    return (
        <div>
            {teamData.map((member, index) => (
                <TeamCard
                    key={index}
                    image={member.image}
                    subHeading={member.subHeading}
                    imageName={member.imageName}
                    intro={member.intro}
                    contribution={member.contribution}
                    socialLinks={member.socialLinks}
                    infoList={member.infoList}
                />
            ))}
        </div>
    );
};

export default TheTeam;
