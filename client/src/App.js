import './App.css';
import './defaultBoxStyle/nav.css';
import './defaultBoxStyle/mainSection.css';
import { useState, useEffect, useRef } from 'react';
import Contact from './components/Contact';
import useDraggable from './hooks/useDraggable';
// import AboutMe from './components/AboutMe';
// import Modal from './components/Modal/index';
// import Me1 from './components/Me1';
// import Me3 from './components/Me3';

const backgrounds = [
  "/media/background/background1.png",
  "/media/background/background2.png",
  "/media/background/background3.webp",
  "/media/background/background4.webp",
  "/media/background/background5.webp",
];

function App() {

  const [isContactOpen, setIsContactOpen] = useState(false);
  // const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);

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

    const x = Math.floor(Math.random() * (window.innerWidth - boxWidth));
    const y = Math.floor(Math.random() * (window.innerHeight - boxHeight));

    return { x, y };
  };

  // Use the draggable hook for position, size, and drag/resize handlers
  const {
    position,
    size,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleResizeToggle,
  } = useDraggable({
    initialPosition: getRandomPosition(),
    initialSize: { width: 420, height: 420 },
  });
  

  return (
    <div className="App flicker-effect" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}       
    style={{
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: currentBackground.toLowerCase().endsWith('.png') ? "700px auto" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        willChange: "transform", // Hint to browser for optimization
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
              }}
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
              }}
            >
            </li>
          </ul>

          <p style={{ backgroundColor: "black", height: "2px"}}></p>
        </nav>

        <h1>todd <br /> taylor</h1>
        <h2 style={{ textAlign: "right", paddingRight: "5%" }}>
          <span style={{ color: "#282828" }}>S</span>oftware <span style={{ color: "#282828" }}>E</span>ngineer <br />
          <span style={{ color: "#282828" }}>/</span>
          <span style={{ color: "#282828" }}>W</span>eb <span style={{ color: "#282828" }}>D</span>ev
        </h2>

        {/* Section buttons GO HERE*/}

        {/* <button className="about" 
          onClick={() => setIsAboutMeOpen(prev => !prev)}>
          <img src={isAboutMeOpen ? "/media/AboutMe_4.png" : "/media/AboutMe_1.png"} alt="About" />
        </button>
        */}

        <button className="contact" onClick={() => setIsContactOpen(prev => !prev)}>
          <img src={isContactOpen ? "/media/Contact_4.png" : "/media/Contact_2.png"} alt="Contact" />
        </button> 


        {isContactOpen && <Contact contactOpenPopup={setIsContactOpen} />}

        {/* {isAboutMeOpen && (
          <Modal isOpen={isAboutMeOpen} onClose={() => {
            setIsAboutMeOpen(false);
            // setMe([]);
            }}
          >
            <AboutMe aboutMeOpenPopup={setIsAboutMeOpen} />
            
            <Me1 aboutMeOpenPopup={setIsAboutMeOpen} />
            <Me3 aboutMeOpenPopup={setIsAboutMeOpen} />
          </Modal>
        )} */}

      </div>
      {/* {isAboutMeOpen && (
        <>
          <Me1 {...getRandomPosition()} />
          <Me3 {...getRandomPosition()} />
        </>
      )} */}

    </div>
  );
}

export default App;
