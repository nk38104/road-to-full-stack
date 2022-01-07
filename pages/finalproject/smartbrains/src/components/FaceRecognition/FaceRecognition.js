import React from "react";


const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className="center ma1">
            <div className="absolute mt2">
                <img className="mb5 br1" src={imageUrl} alt="" width="500px" height="auto" />
            </div>
        </div>
    );
}

export default FaceRecognition;
