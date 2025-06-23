
import './App.css';
import { useState } from 'react';
import Contact from './components/Contact';
import AboutMe from './components/AboutMe';


function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);

  const getRandomPosition = () => {
    const boxWidth = 350;
    const boxHeight = 350;
  
    const centerX = (window.innerWidth - boxWidth) / 2;
    const centerY = (window.innerHeight - boxHeight) / 2;
  
    const offsetX = Math.floor(Math.random() * 100) - 50; // ±50 px
    const offsetY = Math.floor(Math.random() * 100) - 50; // ±50 px
  
    return { x: centerX + offsetX, y: centerY + offsetY };
  };
  

  const [position, setPosition] = useState(getRandomPosition());
  const [size, setSize] = useState({ width: 350, height: 350 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ mouseX: 0, mouseY: 0 });
  const [isResizing, setIsResizing] = useState(false);


  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition({ mouseX: e.clientX - position.x, mouseY: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.mouseX,
        y: e.clientY - startPosition.mouseY,
      });
    } else if (isResizing) {
      const newWidth = Math.max(200, e.clientX - position.x);
      const newHeight = Math.max(200, e.clientY - position.y);
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // setIsResizing(false);
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    // setIsResizing(true);
  };

  return (
    <div className="App" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <header style={{ borderBottom: "2px solid black", paddingBottom: "10px" }}>
        TODDTAYLOR.SOLUTIONS
      </header>

      <div
        className="homePage"
          style={{
          ...homePageStyle,
          position: "absolute",
          top: position.y,
          left: position.x,
          width: size.width,
          height: size.height,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
      >
        <p style={{ backgroundColor: "black", color: "white" }}>/home .... --- -- .</p>
        <h1>todd taylor</h1>
        <h2>Software Engineer / Web Dev</h2>

        {/* Section buttons */}
        <button className="contact" onClick={() => setIsContactOpen(true)}>Contact</button>
        <button className="about" onClick={() => setIsAboutMeOpen(true)}>About</button>

        {isContactOpen && <Contact contactOpenPopup={setIsContactOpen} />}
        {isAboutMeOpen && <AboutMe aboutMeOpenPopup={setIsAboutMeOpen} />}

        {/* Resize handle */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "30px",
            height: "30px",
            backgroundColor: "gray",
            cursor: "se-resize",
          }}
          onMouseDown={handleResizeMouseDown}
        />
      </div>
    </div>
  );
}

const homePageStyle = {
  backgroundColor: "white",
  border: "1px solid black",
  overflow: "scroll",
}

export default App;
