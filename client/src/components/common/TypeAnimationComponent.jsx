import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypeAnimationComponent = () => {
    return (
      <TypeAnimation
        sequence={[
          "Connecting Alumni Across Generations, Building Lifelong Friendships!",
          2500, // Adjusted for smoother speed
          "Connecting Alumni Across Generations, Building Lifelong Memories!",
          2500,
          "Connecting Alumni Across Generations, Building Lifelong Connections!",
          2500
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{
          fontSize: "0.8em",
        }}
      />
    );
  };

  export default TypeAnimationComponent;