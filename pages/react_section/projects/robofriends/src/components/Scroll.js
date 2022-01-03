import React from 'react';


const Scroll = (props) => {
    return (
        <div style={{overflowY: 'scroll', height: '900px', paddingBottom: "225px"}}>
            {props.children}
        </div>
    );
}

export default Scroll;