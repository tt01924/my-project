import { useState, useEffect } from 'react';
import '../defaultBoxStyle/nav.css'
import useDraggable from '../hooks/useDraggable';
import '../defaultBoxStyle/mainSection.css';

const TextFlutter = ({ textFlutterOpenPopup, initialPosition }) => {

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
    initialSize: { width: 300, height: 220 },
    minWidth: 200,
    minHeight: 200,
  });

  const handleClose = (e) => {
    e && e.stopPropagation();
    textFlutterOpenPopup(false);
  }
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsInverted(prev => !prev);
    }, 500); // Toggle every 0.5 seconds

    return () => clearInterval(interval);

  }, []);

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
            /&gt;
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
        backgroundColor: isInverted ? '#ffff00' : '#0000ff',
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
      }}>
        <h2 style={{ margin: 0, marginTop: "50px", paddingLeft: "2%", color: isInverted ? "#000000" : "#ffffff", fontFamily: "pTagFont", fontSize: "40px" }}>patience</h2>
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

export default TextFlutter;
