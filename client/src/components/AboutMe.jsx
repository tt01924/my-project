import { useState } from "react";
const AboutMe = ({ aboutMeOpenPopup }) => {

    return (
        <div
            onClick={() => aboutMeOpenPopup(false)}
            style={overlayStyle}
        >
            <header>Hello</header>
        </div>
    )
}

const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

export default AboutMe