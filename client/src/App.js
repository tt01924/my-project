import './App.css';
import './defaultBoxStyle/nav.css';
import './defaultBoxStyle/mainSection.css';
import { useState, useEffect, useRef } from 'react';
import Contact from './components/Contact';
import About from './components/About';
import AboutPictureOne from './components/AboutPictureOne';
import AboutPictureTwo from './components/AboutPictureTwo';
// import AboutPictureThree from './components/AboutPictureThree';

import useDraggable from './hooks/useDraggable';

const backgrounds = [
  "/media/background/background1.png",
  "/media/background/background2.png",
  "/media/background/background3.webp",
  "/media/background/background4.webp",
  "/media/background/background5.webp",
];

function App() {

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactPosition, setContactPosition] = useState(null);

  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [aboutMePosition, setAboutMePosition] = useState(null);

  const [isAboutPictureOneOpen, setIsAboutPictureOneOpen] = useState(false);
  const [aboutPictureOnePosition, setAboutPictureOnePosition] = useState(null);

  const [isAboutPictureTwoOpen, setIsAboutPictureTwoOpen] = useState(false);
  const [aboutPictureTwoPosition, setAboutPictureTwoPosition] = useState(null);

  // const [isAboutPictureThreeOpen, setIsAboutPictureThreeOpen] = useState(false);
  // const [aboutPictureThreePosition, setAboutPictureThreePosition] = useState(null);

  const hasFetchedRef = useRef(false);

  const API_URL = "https://h50gsrncag.execute-api.eu-west-2.amazonaws.com/count"

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    async function fetchVisitorCount() {
      const res = await fetch(API_URL, { method: 'POST' });
      const data = await res.json();
      document.getElementById('visitor-count').textContent = data.count;
    }

    fetchVisitorCount().catch(console.error);
  }, []);
  
  // Sequential background cycle
  const [currentBackground] = useState(() => {
    const lastIndex = parseInt(localStorage.getItem('backgroundIndex') || '0', 10);
    const nextIndex = (lastIndex + 1) % backgrounds.length;
    localStorage.setItem('backgroundIndex', nextIndex.toString());
    return backgrounds[nextIndex];
  });

  const getRandomPosition = () => {
    const boxWidth = 350;
    const boxHeight = 350;

    // Define the center of the screen
    const centerX = (window.innerWidth - boxWidth) / 2;
    const centerY = (window.innerHeight - boxHeight) / 2;

    const maxOffset = 200; // Adjust this to control randomness range

    const x = centerX + (Math.random() * maxOffset * 2 - maxOffset);
    const y = centerY + (Math.random() * maxOffset * 2 - maxOffset);

    return { x, y };
  };

  // Use the draggable hook for position, size, and drag/resize handlers
  const {
    position,
    size,
    isDragging,
    isMinimized,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleResizeToggle,
    handleMinimize,
  } = useDraggable({
    initialPosition: getRandomPosition(),
    initialSize: { width: 420, height: 420 },
  });
  

  return (
    <div className="App flicker-effect" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}       
    style={{
        '--bg-image': `url(${currentBackground})`,
        '--bg-size': currentBackground.toLowerCase().endsWith('.png') ? "700px auto" : "cover",
        height: "100vh",
        willChange: "transform",
      }}>
      <header style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', left: "2%" }}>No. <span id="visitor-count">...</span></div>
        <div style={{ textAlign: "center", width: '100%' }}>TODDTAYLOR.SOLUTIONS</div>
      </header>

      <div
        className="homePage"
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            width: size.width,
            height: size.height,
          }}
      >
        <nav>
          <ul className='site-nav'>
            <li className='pageName'
              style={{
                height: "30px",
                width: "66%",
                display: "flex",
                alignItems: "center",
                cursor: isDragging ? "grabbing" : "grab",
                whiteSpace: 'nowrap',
              }}
              onMouseDown={handleMouseDown}
              >/home
            </li>
  
            <li
              style={{   
                height: "30px",
                width: "30px",
                backgroundImage: "url(/media/Box_Minimise.png)",
                cursor: "pointer",
                marginLeft: "auto",
              }}
              onClick={handleMinimize}
            >
            </li>

            {/* Expand handle */}
            <li
              style={{     
                height: "30px",
                width: "30px",
                backgroundImage: "url(/media/Box_FIll.png)",
                cursor: "se-resize",
              }}
              onMouseDown={handleResizeToggle}
            >
            </li>

            {/* Close button */}
            <li
              style={{    
                height: "30px",
                width: "30px",
                backgroundImage: "url(/media/Box_Close.png)",
                cursor: "pointer",
                marginRight: "5%",
              }}
            >
            </li>
          </ul>

          <p style={{ backgroundColor: "black", height: "2px"}}></p>
        </nav>

        {!isMinimized && (
          <>
        <h1>todd <br /> taylor</h1>
        <h2 style={{ textAlign: "right", paddingRight: "5%" }}>
          <span style={{ color: "#282828" }}>S</span>oftware <span style={{ color: "#282828" }}>E</span>ngineer <br />
          <span style={{ color: "#282828" }}>/</span>
          <span style={{ color: "#282828" }}>W</span>eb <span style={{ color: "#282828" }}>D</span>ev
        </h2>

        {/* Section buttons GO HERE*/}

        <button className="contact" onClick={() => {
          if (!isContactOpen) {
            setContactPosition(getRandomPosition());
          }
          setIsContactOpen(prev => !prev);
        }}>
          <img src={isContactOpen ? "/media/Contact_4.png" : "/media/Contact_2.png"} alt="Contact" />
        </button>

        <button className="about" onClick={() => {
          if (!isAboutMeOpen) {
            setAboutMePosition(getRandomPosition());
            setAboutPictureOnePosition(getRandomPosition());
            setAboutPictureTwoPosition(getRandomPosition());
          }
          setIsAboutMeOpen(prev => !prev); 
          setIsAboutPictureOneOpen(prev => !prev); 
          setIsAboutPictureTwoOpen(prev => !prev);
        }}>
          <img src={isAboutMeOpen ? "/media/AboutMe_4.png" : "/media/AboutMe_1.png"} alt="About" />
        </button>

          </>
        )}

      </div>

      {/* Contact component moved outside homePage to prevent coupled dragging */}
      {isContactOpen && <Contact initialPosition={contactPosition} contactOpenPopup={setIsContactOpen} />}
      {isAboutMeOpen && <About initialPosition={aboutMePosition} aboutMeOpenPopup={setIsAboutMeOpen} />}
      {isAboutPictureOneOpen && <AboutPictureOne initialPosition={aboutPictureOnePosition} aboutPictureOneOpenPopup={setIsAboutPictureOneOpen} />}
      {isAboutPictureTwoOpen && <AboutPictureTwo initialPosition={aboutPictureTwoPosition} aboutPictureTwoOpenPopup={setIsAboutPictureTwoOpen} />}
      {/* {isAboutMeOpen && <AboutPictureThree initialPosition={aboutPictureThreePosition} aboutPictureThreeOpenPopup={setIsAboutPictureThreeOpen} />} */}

    </div>
  );
}

export default App;
