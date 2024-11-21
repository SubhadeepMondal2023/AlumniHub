import React from 'react';
import TeamCard from '../Alumni/TeamCard';

const TheTeam = () => {
    return (
        <div >
            <TeamCard 
                image="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
                subHeading="Co-Founder, Apple Inc."
                imageName="Steve Jobs"
                description="Pioneer of the personal computer revolution and iconic leader in technology."
            />
            <TeamCard 
                image="https://media.istockphoto.com/id/1364917563/photo/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=NtM9Wbs1DBiGaiowsxJY6wNCnLf0POa65rYEwnZymrM="
                subHeading="Physicist and Chemist"
                imageName="Marie Curie"
                description="First woman to win a Nobel Prize and pioneer in radioactivity research."
            />
            <TeamCard 
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/220px-Outdoors-man-portrait_%28cropped%29.jpg"
                subHeading="Mathematician, Computer Scientist"
                imageName="Alan Turing"
                description="Father of modern computer science and pivotal figure in breaking the Enigma code."
            />
            <TeamCard 
                image="https://www.shutterstock.com/image-photo/handsome-smiling-young-man-folded-260nw-2069457431.jpg"
                subHeading="Computer Scientist, Navy Rear Admiral"
                imageName="Grace Hopper"
                description="Developer of the first compiler and pioneer in computer programming."
            />
        </div>
    );
};

export default TheTeam;
