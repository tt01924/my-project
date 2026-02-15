import { useState } from 'react';
import '../defaultBoxStyle/nav.css'
import useDraggable from '../hooks/useDraggable';
import '../defaultBoxStyle/mainSection.css';
import InspirationOne from './priorWork/InpirationOne';

const PriorWork = ({ priorWorkOpenPopup, initialPosition }) => {

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

  const [isInspirationOneOpen, setIsInspirationOneOpen] = useState(false);
  const [inspirationOnePosition, setInspirationOnePosition] = useState(() => getRandomPosition());

  // Use the custom draggable hook
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
    initialSize: { width: 480, height: 320 },
    minWidth: 200,
    minHeight: 200,
  });

  const handleClose = (e) => {
    e && e.stopPropagation();
    priorWorkOpenPopup(false);

  };

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          ...modalStyle,
          position: "absolute",
          top: position.y,
          left: position.x,
          width: size.width,
          height: size.height,
          cursor: isDragging ? "grabbing" : "default",
          backgroundColor: '#f0f0f0',
          border: "2px solid black",
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 10,
        }}
      >
        <nav style={{ flexShrink: 0 }}>
          <ul className='site-nav'>
            <li className='pageName'
              style={{
                height: "30px",
                width: "66%",
                display: "flex",
                alignItems: "center",
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
              onMouseDown={handleMouseDown}
            >
              /prior work
            </li>

            <li
              title="Minimize"
              style={{
                height: "30px",
                width: "30px",
                backgroundImage: "url(/media/Box_Minimise.png)",
                cursor: "pointer",
                backgroundPosition: 'center',
                marginLeft: 'auto'
              }}
              onClick={handleMinimize}
            >
            </li>

            {/* Expand / Resize handle */}
            <li
              title="Resize"
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
              title="Close"
              style={{
                height: "30px",
                width: "30px",
                backgroundImage: "url(/media/Box_Close.png)",
                cursor: "pointer",
                backgroundPosition: 'center',
                marginRight: "5%"
              }}
              onClick={handleClose}
            >
            </li>
          </ul>

          <p style={{ backgroundColor: "black", height: "2px", margin: 0 }}></p>
        </nav>
        <div style={{ 
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          padding: '2%',
          width: '90%', 
          objectFit: 'cover',
          flex: 1, 
          overflowY: 'auto',
          overflowX: 'hidden',
          border: "2px solid black",
          alignSelf: 'center',
          marginTop: "5%",
          marginBottom: "5%",
          marginLeft: "5%",
          marginRight: "5%",
        }}>
          <h3 style={{ margin: 0, paddingTop: "10px", paddingLeft: "7%", paddingRight: "5%", color: "#0000ff", fontFamily: "pTagFont", fontSize: "28px" }}> &gt; A day </h3>
          <button className="inpiration" onClick={() => {
              if (!isInspirationOneOpen) {
                  setInspirationOnePosition(getRandomPosition());
              }
              setIsInspirationOneOpen(!isInspirationOneOpen);
              }}>
              <img src={isInspirationOneOpen ? "/media/FolderBlue.png" : "/media/FolderGrey.png"} alt="Inspiration" /> 
          </button>
          <p style={{ margin: 0, paddingLeft: "5%", paddingRight: "5%", color: "#282828", fontFamily: "pTagFont" }}> ---</p>
          
          <h3 style={{ margin: 0, paddingTop: "10px", paddingLeft: "7%", paddingRight: "5%", color: "#0000ff", fontFamily: "pTagFont", fontSize: "28px" }}> &gt; In a week </h3>
          <p style={{ margin: 0, paddingLeft: "5%", paddingRight: "5%", color: "#282828", fontFamily: "pTagFont" }}> ---</p>
          
          <h3 style={{ margin: 0, paddingTop: "10px", paddingLeft: "7%", paddingRight: "5%", color: "#0000ff", fontFamily: "pTagFont", fontSize: "28px" }}> &gt; In a year </h3>
          <p style={{ margin: 0, paddingLeft: "5%", paddingRight: "5%", color: "#282828", fontFamily: "pTagFont" }}> ---</p>
        </div>
      </div>
      
      {/* Move InspirationOne outside the main div */}
      {isInspirationOneOpen && (
        <InspirationOne 
          initialPosition={inspirationOnePosition} 
          inspirationOneOpenPopup={setIsInspirationOneOpen} 
        />
      )}
    </>
  );
};

const modalStyle = {
  background: 'white',
  overflow: "scroll",
  width: '300px',
  animation: 'dropTop 1.3s ease'
};

export default PriorWork;
