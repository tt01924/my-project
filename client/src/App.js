import './App.css';
import { useState, useCallback, useEffect, useRef } from 'react';
import Contact from './components/Contact';
import AboutMe from './components/AboutMe';
import Modal from './components/Modal/index';
import Me1 from './components/Me1';
import Me2 from './components/Me2';
import Me3 from './components/Me3';


function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
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

  const getRandomPosition = () => {
    const boxWidth = 350;
    const boxHeight = 350;

    const x = Math.floor(Math.random() * (window.innerWidth - boxWidth));
    const y = Math.floor(Math.random() * (window.innerHeight - boxHeight));

    return { x, y };
  };

  

  const [position, setPosition] = useState(getRandomPosition());
  const [size, setSize] = useState({ width: 350, height: 350 });
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
    <div className="App" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <header style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0 }}>No. <span id="visitor-count">...</span></div>
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
        // onMouseDown={handleMouseDown}
      >
        <nav>
          <ul>
            <li>
              <p className='drag-handle'
                style={{cursor: isDragging ? "grabbing" : "grab",}}
                onMouseDown={handleMouseDown}
              >
                /home .... --- -- .
              </p>

            </li>

            <li
              style={{        
                width: "30px",
                height: "30px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(/media/Box_Minimise.png)",
                cursor: "pointer",
              }}
            >
            </li>

            {/* Expand handle */}
            <li
              style={{        
                width: "30px",
                height: "30px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(/media/Box_Fill.png)",
                cursor: "se-resize",
              }}
              onMouseDown={handleResizeMouseDown}
            >
            </li>

            {/* Close button */}
            <li
              style={{        
                width: "30px",
                height: "30px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(/media/Box_Close.png)",
                cursor: "pointer",
              }}
              // onMouseDown={handleResizeMouseDown}
            >
            </li>
          </ul>

          <p style={{ backgroundColor: "black", height: "2px"}}></p>
        </nav>

        <h1>todd taylor</h1>
        <h2>Software Engineer / Web Dev</h2>

        {/* Section buttons */}
        <button className="about" 
          onClick={() => setIsAboutMeOpen(prev => !prev)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img src={isAboutMeOpen ? "/media/AboutMe_4.png" : "/media/AboutMe_1.png"} alt="About" style={{ width: '100px', height: 'auto' }} />
        </button>

        <button className="contact" onClick={() => setIsContactOpen(prev => !prev)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img src={isContactOpen ? "/media/Contact_4.png" : "/media/Contact_2.png"} alt="About" style={{ width: '100px', height: 'auto' }} />
        </button>


        {isContactOpen && <Contact contactOpenPopup={setIsContactOpen} />}
        

        {isAboutMeOpen && (
          <Modal isOpen={isAboutMeOpen} onClose={() => {
            setIsAboutMeOpen(false);
            // setMe([]);
            }}
          >
            <AboutMe aboutMeOpenPopup={setIsAboutMeOpen} />
            
            <Me1 aboutMeOpenPopup={setIsAboutMeOpen} />
            <Me2 aboutMeOpenPopup={setIsAboutMeOpen} />
            <Me3 aboutMeOpenPopup={setIsAboutMeOpen} />
          </Modal>
        )}

      </div>

      {isAboutMeOpen && (
        <>
          <Me1 {...getRandomPosition()} />
          <Me2 {...getRandomPosition()} />
          <Me3 {...getRandomPosition()} />
        </>
      )}

    </div>
  );
}

export default App;
