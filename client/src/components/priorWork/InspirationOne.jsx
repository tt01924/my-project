import { useState } from 'react';
import '../../defaultBoxStyle/nav.css'
import useDraggable from '../../hooks/useDraggable';

const InspirationOne = ({ inspirationOneOpenPopup, initialPosition }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState('');

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
    initialSize: { width: 270, height: 330 },
    minWidth: 200,
    minHeight: 200,
  });

  const handleClose = (e) => {
    e && e.stopPropagation();
    inspirationOneOpenPopup(false);
  };

  const handleDivClick = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
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
        maxWidth: isMobile ? "270px" : "none",
        height: isMobile ? "auto" : (isExpanded ? (size.height - 20) + 100 : size.height),
        maxHeight: isMobile ? "80vh" : "none",
        cursor: isDragging ? "grabbing" : "default",
        backgroundColor: '#f0f0f0',
        border: "2px solid black",
        zIndex: 30,
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
            /Photo/One
          </li>

          <li
            title="Minimize"
            style={{
              height: "30px",
              width: "30px",
              backgroundImage: "url(/media/Box_Minimise.png)",
              cursor: "pointer",
              backgroundPosition: 'center',
              marginLeft: "auto",
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
              backgroundPosition: 'center',
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
              marginRight: "5%",
            }}
            onClick={handleClose}
          >
          </li>
        </ul>

        <p style={{ backgroundColor: "black", height: "2px", margin: 0 }}></p>
      </nav>
      <img 
        src="/media/InspirationOne.webp" 
        alt="I" 
        className='no-flicker' 
        style={{ 
          boxSizing: 'border-box',
          marginRight: '5%',
          marginLeft: '5%',
          marginTop: '5%',
          height: `calc(${size.height}px - 94px - 30px)`,
          width: '90%', 
          objectFit: 'cover',
          border: '2px solid black',
        }} 
      />
      <div 
        style={{
          height: isExpanded ? '100px' : '20px', 
          width: '90%', 
          marginLeft: '5%',
          backgroundColor: '#ffffff',
          border: '2px solid black',
          cursor: 'pointer',
          boxSizing: 'border-box',
          backgroundImage: isExpanded ? 'none' : 'url(/media/down.png)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '16px 16px'
        }}
        onClick={handleDivClick}
      >
        {isExpanded && (
          <div style={{ 
            overflow: 'auto',
            height: '80px',
            overflowWrap: 'break-word',
            fontSize: '15px',
            margin: 0, 
            paddingTop: "10px", 
            paddingLeft: "5%", 
            paddingRight: "5%", 
            paddingBottom: "5px", 
            color: "#969696", 
            fontFamily: "pTagFont" 
          }}>
            <h3 style={{ color: "#0000ff", fontSize: "20px", marginTop: "-3px" }}> Photo/One </h3>
            <p style={{ marginTop: "-21px" }}> ------------- </p>
            <p style={{ marginTop: "-10px" }}>
            &gt; Yeh.
            </p>
            <p style={{ marginTop: "-10px" }}> ------------- </p>
          </div>
        )}
      </div>
    </div>
  );
};

const modalStyle = {
  background: 'white',
  overflow: "hidden",
  width: '300px',
  animation: 'dropTop 1.3s ease'
};

export default InspirationOne;
