import './App.css';
import './defaultBoxStyle/nav.css';
import { useState, useCallback } from 'react';

const backgrounds = [
  "/media/background/background1.png",
  "/media/background/background2.png",
  "/media/background/background3.jpg",
  "/media/background/background4.jpg",
  "/media/background/background5.jpg",
];

function App() {

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
    <div className="App" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}       
    style={{
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: currentBackground.toLowerCase().endsWith('.png') ? "700px auto" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}>
      <header>
        TODDTAYLOR.SOLUTIONS
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
            <div className='pageName'>Home</div>
              
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
                backgroundImage: "url(/media/Box_FIll.png)",
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
        </nav>

        <p style={{ backgroundColor: "black", height: "2px"}}></p>

        {/* Section buttons GO HERE*/}

      </div>

    </div>
  );
}

export default App;
