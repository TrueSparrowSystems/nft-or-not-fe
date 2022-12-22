import React from "react";
import styles from './twitterIcon.module.scss';
const twitterIconStyle = {fill: '#FA5C00'};

function TwitterIcon(props) {
  return (
    <div className={`${styles.twitterIconWrap}`}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={`${styles.iconFillColor}`}
          d="M17.7233 5.99406C17.7353 6.16813 17.7353 6.34219 17.7353 6.51786C17.7353 11.8705 13.6605 18.0438 6.20936 18.0438V18.0406C4.00829 18.0438 1.85294 17.4133 0 16.2245C0.320053 16.2631 0.641711 16.2823 0.964171 16.2831C2.78823 16.2847 4.56016 15.6726 5.99519 14.5457C4.26177 14.5127 2.74171 13.3826 2.21069 11.7326C2.81792 11.8497 3.44359 11.8256 4.03958 11.6628C2.14973 11.281 0.790107 9.62053 0.790107 7.69219C0.790107 7.67454 0.790107 7.6577 0.790107 7.64086C1.35321 7.95449 1.98369 8.12855 2.62861 8.1478C0.848663 6.95823 0.3 4.59032 1.37487 2.73898C3.43155 5.26973 6.46604 6.80823 9.72353 6.97107C9.39705 5.56412 9.84305 4.08979 10.8955 3.10074C12.5271 1.56706 15.0931 1.64567 16.6267 3.27641C17.534 3.09754 18.4035 2.76465 19.1992 2.29299C18.8968 3.2307 18.2639 4.02722 17.4184 4.53337C18.2214 4.43871 19.0059 4.22374 19.7447 3.89566C19.2008 4.71064 18.5158 5.42053 17.7233 5.99406Z"
          fillOpacity="0.8"
        />
      </svg>
    </div>
  );
}

export default TwitterIcon;
