import { useState } from 'react';
import '../defaultBoxStyle/nav.css'
import useDraggable from '../hooks/useDraggable';

const AboutPictureTwo = ({ aboutPictureTwoOpenPopup, initialPosition }) => {

  // Use the custom draggable hook
  const {
    position,
    size,
    isDragging,
    isMinimized,
    isMobile,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleResizeToggle,
    handleMinimize,
  } = useDraggable({
    initialPosition: initialPosition || { x: 100, y: 100 },
    initialSize: { width: 300, height: 300 },
    minWidth: 200,
    minHeight: 200,
  });

  const handleClose = (e) => {
    e && e.stopPropagation();
    aboutPictureTwoOpenPopup(false);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        ...modalStyle,
        position: isMobile ? "fixed" : "absolute",
        top: isMobile ? "50%" : position.y,
        left: isMobile ? "50%" : position.x,
        transform: isMobile ? "translate(-50%, -50%)" : "none",
        width: isMobile ? "90vw" : size.width,
        maxWidth: isMobile ? "300px" : "none",
        height: isMobile ? "auto" : size.height,
        maxHeight: isMobile ? "80vh" : "none",
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
            /1
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
      <img 
        src="/media/todd2.webp" 
        alt="I" 
        className='no-flicker' 
        style={{ 
          boxSizing: 'border-box',
          padding: '5%',
          width: '100%', 
          maxHeight: 'calc(100% - 64px)',
          objectFit: 'cover',
        }} 
      />
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

export default AboutPictureTwo;
