import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for making elements draggable and resizable
 * @param {Object} options - Configuration options
 * @param {Object} options.initialPosition - Initial {x, y} position (defaults to center)
 * @param {Object} options.initialSize - Initial {width, height} size (defaults to 300x300)
 * @param {number} options.minWidth - Minimum width (default: 200)
 * @param {number} options.minHeight - Minimum height (default: 200)
 * @returns {Object} - Draggable state and handlers
 */
const useDraggable = (options = {}) => {
  const {
    initialPosition,
    initialSize = { width: 300, height: 300 },
    minWidth = 200,
    minHeight = 200,
  } = options;

  // Check if mobile
  const isMobile = () => window.innerWidth <= 600;

  // Calculate default center position
  const getDefaultPosition = () => {
    const boxWidth = initialSize.width;
    const boxHeight = initialSize.height;
    const centerX = (window.innerWidth - boxWidth) / 2;
    const centerY = (window.innerHeight - boxHeight) / 2;
    return { x: centerX, y: centerY };
  };

  // Get centered position for mobile
  const getCenteredPosition = () => {
    return { x: 0, y: 0 }; // CSS will handle centering on mobile
  };

  const [position, setPosition] = useState(() => {
    if (isMobile()) {
      return getCenteredPosition();
    }
    return initialPosition || getDefaultPosition();
  });
  
  const [size, setSize] = useState(() => {
    if (isMobile()) {
      // Use smaller size on mobile
      return { 
        width: Math.min(initialSize.width, window.innerWidth * 0.9), 
        height: Math.min(initialSize.height, window.innerHeight * 0.8) 
      };
    }
    return initialSize;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startPosition, setStartPosition] = useState({ mouseX: 0, mouseY: 0 });

  // For minimize/restore functionality
  const [prevSize, setPrevSize] = useState(size);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isResized, setIsResized] = useState(false);

  // Start dragging (disabled on mobile)
  const handleMouseDown = (e) => {
    if (isMobile()) return; // Disable dragging on mobile
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setStartPosition({ 
      mouseX: e.clientX - position.x, 
      mouseY: e.clientY - position.y 
    });
  };

  // Start resizing (continuous drag resize, disabled on mobile)
  const handleResizeMouseDown = (e) => {
    if (isMobile()) return; // Disable resizing on mobile
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setPrevSize(size);
  };

  // Toggle resize (click to expand/shrink, disabled on mobile)
  const handleResizeToggle = (e, expandAmount = 100) => {
    if (isMobile()) return; // Disable resize toggle on mobile
    e.stopPropagation();
    
    setSize(prev => {
      if (isResized) {
        setIsResized(false);
        return {
          width: prev.width - expandAmount,
          height: prev.height - expandAmount
        };
      } else {
        setIsResized(true);
        return {
          width: prev.width + expandAmount,
          height: prev.height + expandAmount
        };
      }
    });
  };

  // Handle mouse movement for drag/resize
  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.mouseX,
        y: e.clientY - startPosition.mouseY,
      });
    } else if (isResizing) {
      const newWidth = Math.max(minWidth, e.clientX - position.x);
      const newHeight = Math.max(minHeight, e.clientY - position.y);
      setSize({ width: newWidth, height: newHeight });
    }
  }, [isDragging, isResizing, position.x, position.y, startPosition, minWidth, minHeight]);

  // Stop dragging/resizing
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  // Minimize/restore
  const handleMinimize = (e, minimizedHeight = 65) => {
    if (isMobile()) return; // Disable minimize on mobile
    e.preventDefault();
    e.stopPropagation();
    if (!isMinimized) {
      setPrevSize(size);
      setSize({ width: Math.max(minWidth, size.width), height: minimizedHeight });
      setIsMinimized(true);
    } else {
      setSize(prevSize);
      setIsMinimized(false);
    }
  };

  // Add global event listeners when dragging or resizing
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  return {
    // State
    position,
    size,
    isDragging,
    isResizing,
    isMinimized,
    isResized,
    isMobile: isMobile(),
    
    // Setters (for manual control if needed)
    setPosition,
    setSize,
    
    // Handlers
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleResizeMouseDown,
    handleResizeToggle,
    handleMinimize,
    
    // Style helper - returns common positioning styles
    getContainerStyle: (additionalStyles = {}) => ({
      position: 'absolute',
      top: position.y,
      left: position.x,
      width: size.width,
      height: size.height,
      cursor: isDragging ? 'grabbing' : 'default',
      ...additionalStyles,
    }),
  };
};

export default useDraggable;
