
import React, { useEffect, useState } from "react";
import "../css/points.css";
import axios from "axios";
import UploadImage from "./UploadImage";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegTrashAlt } from "react-icons/fa";
import loader from '../pics/loader1.gif'

import { json } from "react-router-dom";

function Xy_click() {
  const [coordinates, setCoordinates] = useState([]);
  const [viewCoordinates, setViewCoordinates] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [uploadImage, setUploadImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [ratio, setRatio] = useState(100);

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
    setViewCoordinates([])
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
    // Convert coordinates back to pixels
    const convertToPixels = (points, inverseRatio) => {
      return points.map(point => ({
        x: point.x / inverseRatio,
        y: point.y / inverseRatio
      }));
    };

    const roomsInMeters = rooms.map(room => convertToMeters(room, ratio));
    setIsLoader(true)
    axios
      .post("http://127.0.0.1:5000/cover_apartment_by_cameras", {
        userId: sessionStorage.getItem("userId") || 1,
        rooms: roomsInMeters,
        imageURL: imageURL,
      })
      .then((res) => {
        console.log(res.data);
        setIsLoader(false)
        const coordinatesInPixels = []
        res.data.forEach(element => {
            // Convert the coordinates from meters back to pixels
          coordinatesInPixels.push(convertToPixels(element, ratio));
          console.log(coordinatesInPixels)
        });
        setViewCoordinates(coordinatesInPixels);

      })
      .catch((err) => {
        setIsLoader(false)
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
  const removeRoom = (i) => {
    const newRooms = rooms.filter((_, index) => index !== i);
    setRooms(newRooms);
  };

  const handleChange = (event) => {
    setRatio(event.target.value);
  };

  return (
    <div className="page-wrapper">
      <div className="sidebar">   
      <div className="ratio-input">
        <div className="ratio-text">Pixels per meter:</div>
        <input type="number" name="name" value={ratio} onChange={handleChange} /> 
      </div>
        <Button as="a" variant="primary" onClick={addRoom}>
          הוסף חדר
        </Button>
        {rooms.length > 0 && (
          <Button className="buttons" as="a" variant="primary" onClick={sendList}>
            שלח
          </Button>
        )}
        {isLoader && <img src={loader} className="loader" alt="loader" />}
        <div className="cordinates-wrapper">
          <h4>Coordinates:</h4>
          {coordinates.length > 0 && (
            <div id="coordinates">
              <ul>
                {coordinates.map((coord, index) => (
                  <li key={index} className="display-room">
                    X: {coord.x}, Y: {coord.y}
                    <span className="trash-room" onClick={() => removePoint(index)}><FaRegTrashAlt /></span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="room-wrapper">
          <ul>
            {Object.keys(rooms).map((key,index) => (
              <li key={key}>
                <strong>Room num: {key}: </strong>
                <span className="trash-room" onClick={() => removeRoom(index)}><FaRegTrashAlt /></span> 
                {typeof rooms[key] === 'object' ? JSON.stringify(rooms[key]) : rooms[key]}
                
              </li>
            ))}
          </ul>
        </div>

      </div>
      <div className="page-content">
      <h3>Upload a sketch and select the vertices of the rooms</h3>
      {viewCoordinates.length > 0 && (
            <div className="final-coordinates">
              <div className="title">Results</div>
              <ul className="display-cams">
              {viewCoordinates.map((room, roomIndex) => (
                <React.Fragment key={roomIndex}>
                  <li className="room-index">Room {roomIndex + 1}</li>
                  {room.map((coord, index) => (
                    <li key={`${roomIndex}-${index}`} className="display-room">
                      X: {coord.x}, Y: {coord.y}, Horizontal angale:{coord.horizontalAngale}, Vertical angale: {coord.verticalAngale}
                    </li>
                  ))}
                </React.Fragment>
              ))}
              </ul>
            </div>
          )}
      <div>
        <UploadImage
          saveClick={handleImageClick}
          coordinates={coordinates}
          viewCoordinates={viewCoordinates}
          uploadImage={uploadImage}
          setImageURL={setImageURL}
        />

      </div>
      

      </div>

    </div>
  );
}

export default Xy_click;
