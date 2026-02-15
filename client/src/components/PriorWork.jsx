import { useState } from 'react';
import '../defaultBoxStyle/nav.css'
import useDraggable from '../hooks/useDraggable';
import '../defaultBoxStyle/mainSection.css';

const PriorWork = ({ priorWorkOpenPopup, initialPosition }) => {

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
    priorWorkOpenPopup(false);

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
        // width: '95%', 
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
        <h3 style={{ margin: 0, paddingTop: "10px", paddingLeft: "7%", paddingRight: "5%", color: "#282828", fontFamily: "pTagFont", fontSize: "28px" }}> &gt; A day </h3>
        <h3 style={{ margin: 0, paddingTop: "10px", paddingLeft: "7%", paddingRight: "5%", color: "#282828", fontFamily: "pTagFont", fontSize: "28px" }}> &gt; In a week </h3>
        <h3 style={{ margin: 0, paddingTop: "10px", paddingLeft: "7%", paddingRight: "5%", color: "#282828", fontFamily: "pTagFont", fontSize: "28px" }}> &gt; In a year </h3>
        <p style={{ margin: 0, paddingLeft: "5%", paddingRight: "5%", color: "#969696", fontFamily: "pTagFont" }}> ---</p>
        <p style={{ margin: 0, paddingTop: "10px", paddingLeft: "5%", paddingRight: "5%", color: "#969696", fontFamily: "pTagFont" }}> &gt; My mind refocused to my eyes, mounted like jewels in their cranial septre staring at the reflection in the window. It held no life of its own, yet when I moved, it moved. A snarl, a smoulder, a wink; each were shown back in retaliation. </p>
      </div>
    </div>
  );
};

const modalStyle = {
  background: 'white',
  overflow: "scroll",
  width: '300px',
  animation: 'dropTop 1.3s ease'
};

export default PriorWork;
