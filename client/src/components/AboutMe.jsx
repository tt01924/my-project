import { useState, useCallback } from "react";
import '../styles/aboutMe.css';

const AboutMe = ({ aboutMeOpenPopup }) => {

      /////////////////// Dragging /////////////////////
      const [isDragging, setIsDragging] = useState(false);
      const [startPosition, setStartPosition] = useState({ mouseX: 0, mouseY: 0 });
      const [isResizing, setIsResizing] = useState(false);
    
      const [position, setPosition] = useState(() => {
        const boxWidth = 300;
        const boxHeight = 300;
        const centerX = (window.innerWidth - boxWidth) / 2;
        const centerY = (window.innerHeight - boxHeight) / 2;
        return { x: centerX, y: centerY };
      });
    
      const [size, setSize] = useState({ width: 300, height: 300 });
    
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

    return (
        <div className="aboutMePopup"
            onClick={() => aboutMeOpenPopup(false)}
        >
            <header>Hello</header>
            <p>saodndsaihfbasdksaodinas doawdklnoskladsaoi</p>
        </div>
    )
}

export default AboutMe