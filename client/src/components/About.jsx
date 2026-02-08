import { useState } from 'react';
import '../defaultBoxStyle/nav.css'
import useDraggable from '../hooks/useDraggable';

const About = ({ aboutMeOpenPopup, initialPosition }) => {

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
    initialPosition: initialPosition || { x: 100, y: 100 },
    initialSize: { width: 350, height: 350 },
    minWidth: 200,
    minHeight: 200,
  });

  const handleClose = (e) => {
    e && e.stopPropagation();
    aboutMeOpenPopup(false);
  };

  return (
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
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
            onMouseDown={handleMouseDown}
          >
            /about me
          </li>

          <li
            title="Minimize"
            style={{
              height: "30px",
              width: "30px",
              backgroundImage: "url(/media/Box_Minimise.png)",
              cursor: "pointer",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
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
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
            onClick={handleClose}
          >
          </li>
        </ul>

        <p style={{ backgroundColor: "black", height: "2px", margin: 0 }}></p>
      </nav>

      {/* If minimized, only show the nav bar (the container is already set to the small height) */}
      {!isMinimized && (
        <>
          <div style={{ padding: 12 }}>

          </div>
        </>
      )}
    </div>
  );
};

const overlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const modalStyle = {
  background: 'white',
  overflow: "hidden",
  width: '300px',
  animation: 'dropTop 1.3s ease'
};

const loadingOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
};

const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid #ccc',
  borderTop: '4px solid #333',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const formRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '10px',
};

const closeButtonStyle = {
  position: 'absolute',
  top: 10,
  right: 10,
  background: 'transparent',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer'
};

export default About;
