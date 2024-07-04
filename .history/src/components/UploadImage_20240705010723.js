import React, { useState, useEffect } from "react";
import "../css/points.css";
import uploadImageToStorage from "../firebase/uploadImageToStorage";

function UploadImage(props) {
  const { coordinates } = props;
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [circles, setCircles] = useState([]);

  const getClickCoords = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    props.saveClick(x, y);
    return [x, y];
  };

  useEffect(() => {
    const newCircles = coordinates.map((coord, index) => (
      <circle
        key={index}
        cx={coord.x}
        cy={coord.y}
        r="5"
        stroke="black"
        strokeWidth="1"
        fill="red"
      />
    ));
    setCircles(newCircles);
  }, [coordinates]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      setImageFile(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (props.uploadImage) {
      props.setImageURL(uploadImageToStorage(imageFile));
    }
  }, [props.uploadImage]);

  return (
    <div>
    <div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("fileInput").click()}
        style={{ margin: "20px", right: "3px" }}
      >
        העלה תמונה
      </button>
 
    </div>
    <div className="img-wrapper">
           <svg
        onClick={(event) => {
          const [x, y] = getClickCoords(event);
          props.saveClick(x, y);
        }}
        className="ClickableSVG"
      >
        <image
          href={image}
          width="100%"
          height="100%"
          className="img"
          
        />
        {circles}
      </svg>
    </div>
  </div>
  );
}

export default UploadImage;
