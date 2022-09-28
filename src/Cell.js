import React from "react";

const Cell = ({ text, onClick }) => {
    return (
        <div className="cols" onClick={onClick}>
            {text}
        </div>
    );
};

export default Cell;
