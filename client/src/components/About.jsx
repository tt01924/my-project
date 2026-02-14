import { useState } from 'react';
import '../defaultBoxStyle/nav.css'
import useDraggable from '../hooks/useDraggable';

const About = ({ aboutMeOpenPopup, aboutPictureOneOpenPopup, aboutPictureTwoOpenPopup, initialPosition }) => {

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
    aboutPictureOneOpenPopup(false);
    aboutPictureTwoOpenPopup(false);

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
            /about me
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
        <h3 style={{ margin: 0, paddingTop: "10px", paddingLeft: "5%", paddingRight: "5%", color: "#0000ff" }}> I/eye </h3>
        <p style={{ margin: 0, paddingLeft: "5%", paddingRight: "5%", color: "#969696" }}> ----------- </p>
        <p style={{ margin: 0, paddingTop: "10px", paddingLeft: "5%", paddingRight: "5%", color: "#969696" }}> &gt; My mind refocused to my eyes, mounted like jewels in their cranial septre staring at the reflection in the window. It held no life of its own, yet when I moved, it moved. A snarl, a smoulder, a wink; each were shown back in retaliation. </p>
        <p style={{ margin: 0, paddingTop: "15px", paddingLeft: "5%", paddingRight: "5%", color: "#969696" }}> &gt; The face looking back at me was crumbling in the echo, that much was obvious without the jaunts. Deep trenches lined the forehead, preparing for battle amongst the forest of eyebrows that held secrets of wiggling and raising on command. As the eyebrows wrapped around the sunken socket, so too did the trenches, encircling the bushy enclave that rested on the head. They wrapped around the eyes which sank below, in alliance with the eyebrows. The eyes, beset with lids that would lower on command, glossed with a clear white surface before a ken-speckled brown and green circled the satin black centre. </p>
        <p style={{ margin: 0, paddingTop: "15px", paddingLeft: "5%", paddingRight: "5%", color: "#969696" }}>&gt; He liked his eyes. They shone in the sunshine. </p>
        <p style={{ margin: 0, paddingTop: "15px", paddingLeft: "5%", paddingRight: "5%", color: "#969696" }}>&gt; He liked the creases wrapped around his face too, it promised he smiled often. </p>
        <p style={{ margin: 0, paddingTop: "15px", paddingLeft: "5%", paddingRight: "5%", color: "#969696" }}>&gt; A face that blossomed amongst the mop of hair, nudged by a pair of heaving shoulders that rested on each side of him.</p>
        <p style={{ margin: 0, paddingTop: "15px", paddingLeft: "5%", paddingRight: "5%", color: "#969696" }}>&gt; A nose curved between the nape of his eyes, jutting outward until it dived towards a messy moustache of impressive proportions. Feathering outwards, the grizzled hair touched upon flushed cheeks which ran under an ever-growing beard to connect with a pair of mottled ears. With rhythm comes rhymes and the face staring back at me began to pucker into a smile that felt so familiar. Yes, I liked this chamber, for all its failing parts, it remained steadfast and quick witted amongst the forever continuous integration and development of the program.</p>
        <p style={{ margin: 0, paddingTop: "15px", paddingLeft: "5%", paddingRight: "5%", paddingBottom: "15px", color: "#969696" }}> ----------- </p>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const modalStyle = {
  background: 'white',
  overflow: "scroll",
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
