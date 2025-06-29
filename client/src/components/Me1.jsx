import React from "react";

const Me1 = ({x, y}) => {
    return (
        <div
            id ='me1'
            style={{
                background: 'white',
                overflow: 'scroll',
                width: '300px',
                animation: 'dropTop 0.9s ease',
                position: "fixed", // Changed from absolute to fixed for better positioning
                top: y,
                left: x,
                height: "auto",
                backgroundColor: "#f0f0f0",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "16px",
                zIndex: 1000, // High z-index to appear above other elements
            }}>
            <img src="/media/me1.jpg" alt="Me" style={{ width: "80%" }} />
        </div>
    )
}

export default Me1;