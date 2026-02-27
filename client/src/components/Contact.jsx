import { useState } from 'react';
import '../defaultBoxStyle/nav.css'
import useDraggable from '../hooks/useDraggable';

const Contact = ({ contactOpenPopup, initialPosition }) => {

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
    initialSize: { width: 350, height: 310 },
    minWidth: 200,
    minHeight: 200,
  });

  const handleClose = (e) => {
    e && e.stopPropagation();
    contactOpenPopup(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use Render API for contact form
      const res = await fetch('https://toddtaylor-com.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setIsLoading(false);
      if (data.success) {
        alert('Message sent!');
        contactOpenPopup(false);
      } else {
        alert('Message failed.');
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      alert('Error sending message.');
    }
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
        maxWidth: isMobile ? "350px" : "none",
        height: isMobile ? "auto" : size.height,
        maxHeight: isMobile ? "80vh" : "none",
        cursor: isDragging ? "grabbing" : "default",
        backgroundColor: '#f0f0f0',
        border: "2px solid black",
        zIndex: 99,
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
              userSelect: 'none'
            }}
            onMouseDown={handleMouseDown}
          >
            /contact
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

      {/* If minimized, only show the nav bar (the container is already set to the small height) */}
      {!isMinimized && (
        <>
          {/* Loading overlay */}
          {isLoading && (
            <div style={loadingOverlayStyle}>
              <div style={spinnerStyle}></div>
              <p style={{ marginTop: '16px', color: '#333' }}>Sending...</p>
            </div>
          )}

          <div style={{ padding: 12 }}>

            <form onSubmit={handleSubmit}>
              <div style={formRowStyle}>
                <label style={{ fontFamily: "boldTitleFont" }}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ fontFamily: "pageFont" }}
                />
              </div>

              <div style={formRowStyle}>
                <label style={{ fontFamily: "boldTitleFont" }}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ fontFamily: "pageFont" }}
                />
              </div>

              <div style={formRowStyle}>
                <label style={{ fontFamily: "boldTitleFont" }}>Mobile:</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  style={{ fontFamily: "pageFont" }}
                />
              </div>

              <div style={formRowStyle}>
                <label style={{ fontFamily: "boldTitleFont" }}>Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{ fontFamily: "pageFont" }}
                />
              </div>

              <div style={formRowStyle}>
                <label style={{ fontFamily: "boldTitleFont" }}>Message:</label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{ fontFamily: "pageFont" }}
                />
              </div>
              <div style={{ float: 'right', marginTop: '-15px' }}>
                <button type="submit" style={{   
                  height: "60px",
                  width: "auto",
                  paddingLeft: "10px",
                  paddingRight: "60px",
                  backgroundImage: "url(/media/Contact_Send_Arrow.png)",
                  backgroundPosition: "right center",
                  backgroundSize: "80px",
                  cursor: "pointer",
                  fontFamily: "boldTitleFont",
                  border: "none",
                  backgroundColor: "transparent",
                }}>Send</button>
              </div>
            </form>
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
  zIndex: 100
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

export default Contact;
