import React from "react";
import styles from "./arrowIcon.module.scss";

function LeftArrow({ hovered }) {
  return (
    <div className={`${styles.arrowIconWrap}`}>
      <svg
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={`${styles.iconOpacity}`}
          d="M28.75 36.4167L15.3333 23L28.75 9.58334"
          stroke="white"
          strokeOpacity={hovered ? "1" : "0.8"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default LeftArrow;
