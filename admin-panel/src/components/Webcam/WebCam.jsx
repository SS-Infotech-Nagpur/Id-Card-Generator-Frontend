import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import "./WebCam.css";

const WebCam = ({ getImage }) => {
    const [camera, setCamera] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const webcamRef = useRef(null);

    const handleCamera = (event) => {
        event.preventDefault(); 
        setCamera(prevCamera => !prevCamera);
    };

    const captureImage = (event) => {
        event.preventDefault(); 
        const image = webcamRef.current.getScreenshot();
        setImageSrc(image);
        getImage(image);
    };

    return (
        <div>
            <button 
                onClick={handleCamera} 
                className='btn btn-danger'
                type='button'
                style={{ display: "flex" }}
            >
                {camera ? 'Turn Off Camera' : 'Turn On Camera'}
            </button>
            {camera && (
                <>
                    <Webcam
                        audio={false} 
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        id='cameraWindow'
                    />
                    <button 
                        style={{ display: "flex" }} 
                        className='btn btn-success' 
                        onClick={captureImage}
                        type='button' // Prevent form submission
                    >
                        Capture Image
                    </button>
                </>
            )}
            {imageSrc && (
                <div>
                    <h3>Preview</h3>
                    <img 
                        src={imageSrc} 
                        alt="Captured"
                        style={{ height: "150px", width: "150px" }}
                    />
                </div>
            )}
        </div>
    );
};

export default WebCam;