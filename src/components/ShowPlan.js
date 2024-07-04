import React from "react";
import "../css/points.css"
export default function ShowPlan(props) {

    return (<>
      <svg className="ClickableSVG" width="100%" viewBox="0 0 1270 770">
        <image
          href={props.img}
          width="100%"
          height="100%"
          className="img"
          preserveAspectRatio="xMidYMid meet"
        />
        {props.coord.map((i, idx) => (
          <circle
            key={idx}
            cx={i.X}
            cy={i.Y}
            r="5"
            stroke="black"
            strokeWidth="1"
            fill="red"
            className="crcl"
          />
        ))}
      </svg></>
    );
}