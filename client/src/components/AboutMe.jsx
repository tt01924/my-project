import { useState } from "react";
import '../styles/aboutMe.css';
const AboutMe = ({ aboutMeOpenPopup }) => {

    return (
        <div className="aboutMePopup"
            onClick={() => aboutMeOpenPopup(false)}
        >
            <header>Hello</header>
        </div>
    )
}

const overlayStyle = {

  };

export default AboutMe