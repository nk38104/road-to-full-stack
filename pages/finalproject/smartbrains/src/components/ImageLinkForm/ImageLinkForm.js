import React from "react";
import "./ImageLinkForm.css";


const ImageLinkForm = () => {
    return (
        <div>
            <p className="f3">
                {'The SmartBrain will detect faces in your images. Give it a try.'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center br3 br--left" type="text"/>
                    <button className="f4 w-30 black grow link ph3 pv2 dib bg-light-blue br3 br--right">Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
