
import React, { useEffect, useState } from "react";
import "../css/points.css";
import axios from "axios";
import UploadImage from "./UploadImage";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { json } from "react-router-dom";

function Xy_click() {
  const [coordinates, setCoordinates] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [uploadImage, setUploadImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  const handleImageClick = (x, y) => {
    setCoordinates([...coordinates, { x, y }]);
  };

  useEffect(() => {
//   alert(`משתמש יקר!\n
// עליך להעלות שרטוט אדריכלי של הבית בו אתה מעוניין להתקין מצלמות אבטחה.\n
// עם העכבר עליך לסמן בכל חדר את הקודקודים שלו,\n
// במידה ואתה מעוניין למחוק קודקוד, תוכל להקיש על סימן ה"אשפה" ברשימת הקודקודים שבתחתית הדף\n
// לאחר כל חדר יש להקיש על "הוסף חדר"\n
// בסיום-לחץ על הכפתור "שלח"`);
},[])
  const sendList = () => {
    setUploadImage(true);
    // Calculate the ratio
    const x1 = 658;
    const x2 = 369;
    const deltaX = Math.abs(x1 - x2);
    const ratio = 6.10 / deltaX; // meters per pixel

    // Convert coordinates to meters
    const convertToMeters = (points, ratio) => {
      return points.map(point => ({
        x: point.x * ratio,
        y: point.y * ratio
      }));
    };

    const roomsInMeters = rooms.map(room => convertToMeters(room, ratio));

    axios
      .post("http://127.0.0.1:5000/cover_apartment_by_cameras", {
        userId: sessionStorage.getItem("userId") || 1,
        rooms: rooms,
        imageURL: imageURL,
      })
      .then((res) => {
        console.log(res.data);
        setCoordinates(res.data.optimalCoordinates);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addRoom = () => {
    setRooms([...rooms, coordinates]);
    setCoordinates([]); // Reset coordinates
  };

  const removePoint = (i) => {
    const newCoordinates = coordinates.filter((_, index) => index !== i);
    setCoordinates(newCoordinates);
  };

  return (
    <div className="page-wrapper">
      <div className="sidebar">      
      <Button as="a" variant="primary" onClick={addRoom}>
        הוסף חדר
      </Button>
      {rooms.length && (
        <Button className="buttons" as="a" variant="primary" onClick={sendList}>
          שלח
        </Button>
      )}
      <ul>
        {Object.keys(rooms).map((key,index) => (
          <li key={key} onClick={() => removePoint(index)}>
            <strong>Room num: {key}:</strong>
            {typeof rooms[key] === 'object' ? JSON.stringify(rooms[key]) : rooms[key]}
            <FaRegTrashAlt />
          </li>
        ))}
      </ul>
        {coordinates.length > 0 && (
          <div id="coordinates">
            <h3>Coordinates:</h3>
            <ul>
              {coordinates.map((coord, index) => (
                <li key={index} onClick={() => removePoint(index)}>
                  X: {coord.x}, Y: {coord.y}
                  <FaRegTrashAlt />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="page-content">
      <h3>Upload a sketch and select the vertices of the rooms</h3>
      <div>
        <UploadImage
          saveClick={handleImageClick}
          coordinates={coordinates}
          uploadImage={uploadImage}
          setImageURL={setImageURL}
        />

      </div>
      

      </div>

    </div>
  );
}

export default Xy_click;
