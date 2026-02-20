import './App.css';
import './defaultBoxStyle/nav.css';
import './defaultBoxStyle/mainSection.css';
import { useState, useEffect, useRef, use } from 'react';
import Contact from './components/Contact';
import About from './components/About';
import AboutPictureOne from './components/AboutPictureOne';
import AboutPictureTwo from './components/AboutPictureTwo';
import PriorWork from './components/PriorWork';
import TextFlutter from './components/TextFlutter';

import useDraggable from './hooks/useDraggable';

const backgrounds = [
  "/media/background/background1.png",
  "/media/background/background2.png",
  "/media/background/background3.webp",
  "/media/background/background4.webp",
  "/media/background/background5.webp",
];

function App() {

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 600);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactPosition, setContactPosition] = useState(null);

  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [aboutMePosition, setAboutMePosition] = useState(null);

  const [isAboutPictureOneOpen, setIsAboutPictureOneOpen] = useState(false);
  const [aboutPictureOnePosition, setAboutPictureOnePosition] = useState(null);

  const [isAboutPictureTwoOpen, setIsAboutPictureTwoOpen] = useState(false);
  const [aboutPictureTwoPosition, setAboutPictureTwoPosition] = useState(null);

  const [isPriorWorkOpen, setIsPriorWorkOpen] = useState(false);
  const [priorWorkPosition, setPriorWorkPosition] = useState(null);

  const [isTextFlutterOpen, setIsTextFlutterOpen] = useState(false);
  const [textFlutterPosition, setTextFlutterPosition] = useState(null);

  const [time, setTime] = useState(new Date());

  const hasFetchedRef = useRef(false);

  const API_URL = "https://h50gsrncag.execute-api.eu-west-2.amazonaws.com/count"

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
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
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        position: 'relative', 
        height: '40px',
        justifyContent: 'space-between',
        padding: '0 10px',
      }}>
        <div style={{ 
          position: isMobile ? 'relative' : 'absolute', 
          left: isMobile ? '0' : '2%',
          whiteSpace: 'nowrap',
          color: 'black',
          fontSize: isMobile ? '12px' : 'inherit'
        }}>No. <span id="visitor-count">...</span></div>
        
        {!isMobile && (
          <div style={{ 
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'auto'
          }}>WESSVEX.SOLUTIONS</div>
        )}
        
        {isMobile && (
          <div style={{ 
            marginLeft: 'auto',
            marginRight: '10px',
            fontSize: '12px',
            whiteSpace: 'nowrap'
          }}>WESSVEX.SOLUTIONS</div>
        )}
        
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto'
        }}>
          <div style={{ 
            textAlign: "center", 
            borderRight: '2px solid black', 
            borderLeft: '2px solid black', 
            marginRight: isMobile ? '10px' : '20px', 
            backgroundColor: '#0000ff', 
            color: '#f0f0f0',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 10px',
            minWidth: isMobile ? '80px' : '100px',
            fontVariantNumeric: 'tabular-nums',
            fontSize: isMobile ? '12px' : 'inherit'
          }}>{time.toLocaleTimeString()}</div>
          <div style={{ 
            textAlign: "center", 
            paddingRight: isMobile ? '0' : '20px',
            fontSize: isMobile ? '12px' : 'inherit',
            whiteSpace: 'nowrap'
          }}>{time.toLocaleDateString()}</div>
        </div>
      </header>

      <div
        className="homePage"
          style={{
            position: isMobile ? "fixed" : "absolute",
            top: isMobile ? "50%" : position.y,
            left: isMobile ? "50%" : position.x,
            transform: isMobile ? "translate(-50%, -50%)" : "none",
            width: isMobile ? "90vw" : size.width,
            height: isMobile ? "auto" : size.height,
            maxHeight: isMobile ? "80vh" : "none",
            overflow: isMobile ? "auto" : "hidden",
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
              >/tabernacle
            </li>
  
            <li
              style={{   
                height: "30px",
                width: "30px",
                backgroundImage: "url(/media/Box_Minimise.png)",
                cursor: isMobile ? "default" : "pointer",
                marginLeft: "auto",
              }}
              onClick={isMobile ? undefined : handleMinimize}
            >
            </li>

            {/* Expand handle */}
            <li
              style={{     
                height: "30px",
                width: "30px",
                backgroundImage: "url(/media/Box_FIll.png)",
                cursor: isMobile ? "default" : "se-resize",
              }}
              onMouseDown={isMobile ? undefined : handleResizeToggle}
            >
            </li>

            {/* Close button */}
            <li
              style={{  
                title: "Unavailable - Resize",
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
        <h1>wessly <br /> vex</h1>
        <h2 style={{ textAlign: "right", paddingRight: "5%" }}>
          <span style={{ color: "#282828" }}>C</span>reative <span style={{ color: "#282828" }}>S</span>olutions <br />
          <span style={{ color: "#282828" }}>/</span>
          <span style={{ color: "#282828" }}>T</span>abula <span style={{ color: "#282828" }}>R</span>asa
        </h2>

        {/* Section buttons GO HERE*/}

        <div className={isMobile ? "mobile-buttons-container" : ""}>
          <button className={isMobile ? "" : "contact"} onClick={() => {
            if (!isContactOpen) {
              setContactPosition(getRandomPosition());
            }
            setIsContactOpen(prev => !prev);
          }}>
            <img src={isContactOpen ? "/media/Contact_4.png" : "/media/Contact_2.png"} alt="Contact" />
          </button>

          <button className={isMobile ? "" : "about"} onClick={() => {
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

          <button className={isMobile ? "" : "priorWork"} onClick={() => {
            if (!isPriorWorkOpen) {
              setPriorWorkPosition(getRandomPosition());
            }
            setIsPriorWorkOpen(prev => !prev);
          }}>
            <img src={isPriorWorkOpen ? "/media/PriorWork_4.png" : "/media/PriorWork_2.png"} alt="Prior Work" />
          </button>

          <button className={isMobile ? "" : "textFlutter"} onClick={() => {
            if (!isTextFlutterOpen) {
              setTextFlutterPosition(getRandomPosition());
            }
            setIsTextFlutterOpen(prev => !prev);
          }}>
            <img src={isTextFlutterOpen ? "/media/OpenedFolder.png" : "/media/UnopenedFolder.png"} alt="TextFlutter" /> 
          </button>
        </div>

          </>
        )}

      </div>

      {/* Contact component moved outside homePage to prevent coupled dragging */}
      {isContactOpen && <Contact initialPosition={contactPosition} contactOpenPopup={setIsContactOpen} />}
      {isAboutMeOpen && <About initialPosition={aboutMePosition} aboutMeOpenPopup={setIsAboutMeOpen} aboutPictureOneOpenPopup={setIsAboutPictureOneOpen} aboutPictureTwoOpenPopup={setIsAboutPictureTwoOpen} />}
      {isAboutPictureOneOpen && <AboutPictureOne initialPosition={aboutPictureOnePosition} aboutPictureOneOpenPopup={setIsAboutPictureOneOpen} />}
      {isAboutPictureTwoOpen && <AboutPictureTwo initialPosition={aboutPictureTwoPosition} aboutPictureTwoOpenPopup={setIsAboutPictureTwoOpen} />}
      {isPriorWorkOpen && <PriorWork initialPosition={priorWorkPosition} priorWorkOpenPopup={setIsPriorWorkOpen} />}
      {isTextFlutterOpen && <TextFlutter initialPosition={textFlutterPosition} textFlutterOpenPopup={setIsTextFlutterOpen} />}

    </div>
  );
}

export default App;
