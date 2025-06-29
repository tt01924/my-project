import React, { useState, useCallback } from 'react';

const Contact = ({ contactOpenPopup }) => {

  /////////////////// Dragging /////////////////////
const [isDragging, setIsDragging] = useState(false);
const [startPosition, setStartPosition] = useState({ mouseX: 0, mouseY: 0 });
const [isResizing, setIsResizing] = useState(false);

const [position, setPosition] = useState(() => {
  const boxWidth = 450;
  const boxHeight = 450;
  const centerX = (window.innerWidth - boxWidth) / 2;
  const centerY = (window.innerHeight - boxHeight) / 2;
  return { x: centerX, y: centerY };
});

const [size, setSize] = useState({ width: 450, height: 450 });

const handleMouseDown = (e) => {
  e.preventDefault();
  e.stopPropagation();
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
///////////////////// End /////////////////////


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://toddtaylor-com.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        alert('Message sent!');
        contactOpenPopup(false);
      } else {
        alert('Message failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending message.');
    }
  };

  return (
    <div
      // onClick={() => contactOpenPopup(false)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={overlayStyle}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          ...modalStyle,
          position: "absolute",
          top: position.y,
          left: position.x,
          width: size.width,
          height: size.height,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
      >
        <header>
          <p>/contact -.-. --- -. - .- -.-. -</p>
          <button onClick={() => contactOpenPopup(false)} style={closeButtonStyle}>X</button>
        </header>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />

          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send</button>
        </form>
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
  border: "1px solid black",
  overflow: "scroll",
  width: '300px',
  animation: 'dropTop 1.3s ease'
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
