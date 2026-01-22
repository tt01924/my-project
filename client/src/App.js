import './App.css';
import './defaultBoxStyle/nav.css';
import './defaultBoxStyle/mainSection.css';
import { useState, useCallback } from 'react';
// import Contact from './components/Contact';
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

  // const [isContactOpen, setIsContactOpen] = useState(false);
  // const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  
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

  

  const [position, setPosition] = useState(getRandomPosition());
  const [size, setSize] = useState({ width: 420, height: 420 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ mouseX: 0, mouseY: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isResized, setIsResized] = useState(false);


  ////////////////////// Dragging ///////////////////////

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition({ mouseX: e.clientX - position.x, mouseY: e.clientY - position.y });
  };

  const handleMouseMove = useCallback((e) => {
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
  }, [isDragging, isResizing, position.x, position.y, startPosition]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
  
    setSize(prev => {
      if (isResized) {
        // Shrink back to original size
        setIsResized(false);
        return {
          width: prev.width - 100,
          height: prev.height - 100
        };
      } else {
        // Enlarge
        setIsResized(true);
        return {
          width: prev.width + 100,
          height: prev.height + 100
        };
      }
    });
  };
  

  return (
    <div className="App flicker-effect" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}       
    style={{
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: currentBackground.toLowerCase().endsWith('.png') ? "700px auto" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}>
      <header style={{ backgroundColor: "#f0f0f0"}}>
        WESSVEX.SOLUTIONS
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
              onMouseDown={handleResizeMouseDown}
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
        </nav>

        <div style={{ backgroundColor: "black", height: "2px", marginTop: "0%"}}></div>

        <h1>todd <br /> taylor</h1>
        <h2 style={{ textAlign: "right", paddingRight: "5%" }}>
          <span style={{ color: "#282828" }}>S</span>oftware <span style={{ color: "#282828" }}>E</span>ngineer <br />
          <span style={{ color: "#282828" }}>/</span>
          <span style={{ color: "#282828" }}>W</span>eb <span style={{ color: "#282828" }}>D</span>ev
        </h2>

        {/* Section buttons GO HERE*/}
        {/* <button className="about" 
          onClick={() => setIsAboutMeOpen(prev => !prev)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img src={isAboutMeOpen ? "/media/AboutMe_4.png" : "/media/AboutMe_1.png"} alt="About" style={{ width: '100px', height: 'auto' }} />
        </button>

        <button className="contact" onClick={() => setIsContactOpen(prev => !prev)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img src={isContactOpen ? "/media/Contact_4.png" : "/media/Contact_2.png"} alt="About" style={{ width: '100px', height: 'auto' }} />
        </button> */}


        {/* {isContactOpen && <Contact contactOpenPopup={setIsContactOpen} />}
        

        {isAboutMeOpen && (
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
