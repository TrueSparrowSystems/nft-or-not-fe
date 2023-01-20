import React from "react";
import styles from "./githubIcon.module.scss";

function GithubIcon(props) {
  return (
    <div className={`${styles.githubIconWrap}`}>
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4138_215)">
          <path
            className={`${styles.iconFillColor}`}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0117 0C4.48672 0 0.0117188 4.475 0.0117188 10C0.0117188 14.425 2.87422 18.1625 6.84922 19.4875C7.34922 19.575 7.53672 19.275 7.53672 19.0125C7.53672 18.775 7.52422 17.9875 7.52422 17.15C5.01172 17.6125 4.36172 16.5375 4.16172 15.975C4.04922 15.6875 3.56172 14.8 3.13672 14.5625C2.78672 14.375 2.28672 13.9125 3.12422 13.9C3.91172 13.8875 4.47422 14.625 4.66172 14.925C5.56172 16.4375 6.99922 16.0125 7.57422 15.75C7.66172 15.1 7.92422 14.6625 8.21172 14.4125C5.98672 14.1625 3.66172 13.3 3.66172 9.475C3.66172 8.3875 4.04922 7.4875 4.68672 6.7875C4.58672 6.5375 4.23672 5.5125 4.78672 4.1375C4.78672 4.1375 5.62422 3.875 7.53672 5.1625C8.33672 4.9375 9.18672 4.825 10.0367 4.825C10.8867 4.825 11.7367 4.9375 12.5367 5.1625C14.4492 3.8625 15.2867 4.1375 15.2867 4.1375C15.8367 5.5125 15.4867 6.5375 15.3867 6.7875C16.0242 7.4875 16.4117 8.375 16.4117 9.475C16.4117 13.3125 14.0742 14.1625 11.8492 14.4125C12.2117 14.725 12.5242 15.325 12.5242 16.2625C12.5242 17.6 12.5117 18.675 12.5117 19.0125C12.5117 19.275 12.6992 19.5875 13.1992 19.4875C15.1844 18.8173 16.9094 17.5415 18.1315 15.8395C19.3536 14.1376 20.0112 12.0953 20.0117 10C20.0117 4.475 15.5367 0 10.0117 0Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_4138_215">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(0.0117188)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default GithubIcon;
