import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import ShowPlan from "./ShowPlan";
import '../css/history.css';

export default function HistoryPlanning() {
  const [currentPlanning, setCurrentPlanning] = useState(null);
  const [lastPlanning, setLastPlanning] = useState([
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/security-camera-project-14bd8.appspot.com/o/images%2F%D7%9E%D7%A6%D7%91-%D7%A7%D7%99%D7%99%D7%9D.bf0cd87574ea102fcf8d.jpg?alt=media&token=dc099af9-f3dc-4bac-a8ee-ba4518eab519",
      coord: [
        { X: 1091, Y: 104.90625 },
        { X: 855, Y: 101.90625 },
        { X: 845, Y: 503.90625 },
        { X: 1092, Y: 501.90625 },
        { X: 671, Y: 502.90625 },
        { X: 453, Y: 499.90625 },
        { X: 453, Y: 278.90625 },
        { X: 665, Y: 282.90625 },
      ],
    },
  ]);

  const removePlan = () => {
    setCurrentPlanning();
  }
  

    useEffect(() => {
      axios
        .post("http://127.0.0.1:5000/historyPlanning", {
          userId: sessionStorage.getItem("userId"),
        })
        .then((res) => {
          console.log(res.data);
          setLastPlanning(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

  const handleCardClick = (item) => {
    setCurrentPlanning(item);
  };


  return (
    <div>
      <h2>Projects History</h2>
      <div className="page-wrapper">
        {lastPlanning.length === 0 && (
          <h1>עוד לא תכננת הצבת מצלמות דרך האלגוריתם האופטימלי שלנו</h1>
        )}
        <div className="history-sidebar">
          {lastPlanning.map((item, index) => {
            return (
              <div>
                <Card
                  className="card"
                  style={{ width: "18rem", cursor: "pointer" }}
                  onClick={() => handleCardClick(item)}
                  key={index}
                >
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.date}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
          </div>
          <div className="history-content" >
          {currentPlanning &&
            <>
            <h1 onClick={removePlan} className="close-image">X</h1>
          <ShowPlan img={currentPlanning.image} coord={currentPlanning.coord}/></>}
        </div>
      </div>
    </div>
  );
}
