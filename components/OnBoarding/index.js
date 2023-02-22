import Image from "next/image";
import React from "react";
import styles from "./OnBoarding.module.scss";
import hand from "./gif/hand.gif";
import collect from "./collect.png";
import hotOrNot from "./gif/hotOrNot.gif";
import FireSvg from "../vote/svg/FireSvg";
import Not from "/components/vote/svg/not.js";
import HallOfFlamSvg from "../vote/svg/FirstTimeUser/HallOfFlamsvg";
import GenerateSvg from "../vote/svg/FirstTimeUser/GenerateSvg";
import CollectSvg from "../vote/svg/FirstTimeUser/CollectSvg";
import OnboardingContent from "./OnBoardingContent";
import ClickOnHot from "../vote/svg/clickOnHot";
import HotButtonSvg from "../vote/svg/HotButtonSvg";
import HoverOnHotSvg from "../vote/svg/HoverOnHotSvg";
import HoverOnNotSvg from "../vote/svg/HoverOnNotSvg";

import { id } from "ethers/lib/utils.js";

function OnBoarding({ setOnBoarding }) {
  const [isNotButtonClicked, setIsNotButtonClicked] = React.useState(false);
  const [isHotButtonClicked, setIsHotButtonClicked] = React.useState(false);
  const [HotactiveToolTip, setHotActiveToolTip] = React.useState(false);
  const [NotactiveToolTip, setNotActiveToolTip] = React.useState(false);
  const onBoardingDetailsArray = [
    {
      title:
        "Join in on a thrilling showdown of AI-generated images where you and the community cast votes!",
      // gif: hand,
      // type: "gif",
    },
    {
      title: "For each image, you vote whether it is Hot or Not!",
      subTitle: "All images are AI generated by other users",
      gif: hotOrNot,
      width: 267,
      height: 160,
      type: "gif",
    },
    {
      title: "Collect hot NFTs by your lens frens to show your support💰",
      subTitle: "Collect proceeds go to the user who generated it.",
      gif: collect,
      width: 212,
      height: 190,
      type: "gif",
    },
    {
      title:
        "NFTs with the highest number of votes will be showcased in the Hall of Flame",
      subTitle: "",
      gif: <HallOfFlamSvg />,
      width: 489,
      height: 231,
      type: "svg",
    },
    {
      title:
        "Participate by generating AI images on NFT or Not and get started!",
      subTitle: "",
      gif: <GenerateSvg />,
      width: 160,
      height: 160,
      type: "svg",
    },
  ];
  const [data, setData] = React.useState(onBoardingDetailsArray.reverse());

  const swiped = async (dir) => {
    animatecard(dir);
  };

  let styleSheet = null;
  const dynamicHotAnimation = () => {
    if (!styleSheet) {
      styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      document.head.appendChild(styleSheet);
    }

    styleSheet.sheet.insertRule(
      `@keyframes newAnimation {
      from {
        transform: rotate(0deg);
        opacity: 1;
      }
      to {
        transform: rotate(15deg) translateX(180px);
        opacity: 0;
      }
    }`,
      styleSheet.length
    );
  };

  const dynamicNotAnimation = () => {
    if (!styleSheet) {
      styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      document.head.appendChild(styleSheet);
    }

    styleSheet.sheet.insertRule(
      `@keyframes newAnimation {
      from {
        transform: rotate(0deg);
        opacity: 1;
      }
      to {
        transform: rotate(-15deg) translateX(-180px);
        opacity: 0;
      }
    }`,
      styleSheet.length
    );
  };

  const animatecard = (dir) => {
    let voteCard = document.getElementById("vote-card");
    var lastChild = voteCard.lastElementChild;
    lastChild.setAttribute("id", "lastvoteCard");
    let demoIdVar = document.getElementById("lastvoteCard");
    dir == "left"
      ? dynamicNotAnimation("newAnimation", demoIdVar.value)
      : dynamicHotAnimation("newAnimation", demoIdVar.value);
    demoIdVar.style.animation = "newAnimation 1s";
    setTimeout(() => {
      const spliceData = data.slice(0, -1);
      setData(spliceData);
    }, 800);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div
          id="vote-card"
          className={`${styles.cardContainer} flex justify-center mt-[25px] mb-[15px] order-2 aspect-[512/512] h-[520px] cursor-grab ${styles.voteCards}`}
        >
          {data.length > 0 &&
            data.map((onBoardingDetailsArray, index) => (
              <div
                key={index}
                className={`absolute pressable  ${styles.voteCard}`}
              >
                <OnboardingContent
                  index={index}
                  onBoardingDetailsArray={onBoardingDetailsArray}
                />
              </div>
            ))}
        </div>
        {data.length > 0 ? (
          <>
            <button
              className={`absolute md:relative left-0`}
              disabled={isNotButtonClicked || data.length == 0}
              onMouseEnter={() => {
                setNotActiveToolTip(true);
              }}
              onMouseLeave={() => {
                setNotActiveToolTip(false);
              }}
              onClick={() => {
                swiped("left");
                setIsNotButtonClicked(true);
                setTimeout(() => {
                  setIsNotButtonClicked(false);
                }, 2000);
                if (data.length === 1) {
                  window.localStorage.setItem("onBoardingKey", false);
                  setOnBoarding(false);
                }
              }}
            >
              <div
                className={`${styles.buttonClassNot} ${
                  !isNotButtonClicked && !NotactiveToolTip ? `block` : `hidden`
                } m-[8px]`}
              >
                <Not />
              </div>

              {NotactiveToolTip && !isNotButtonClicked && (
                <div className={`${styles.buttonClassNot} m-[8px]`}>
                  <HoverOnNotSvg />
                </div>
              )}

              <div
                className={`${styles.buttonClassNot} ${
                  isNotButtonClicked ? `block` : `hidden`
                } m-[8px]`}
              >
                <ClickOnHot />
              </div>
            </button>

            <button
              className={`absolute md:relative right-0 order-last`}
              disabled={isHotButtonClicked || data.length == 0}
              onMouseEnter={() => {
                setHotActiveToolTip(true);
              }}
              onMouseLeave={() => {
                setHotActiveToolTip(false);
              }}
              onClick={() => {
                swiped("right");
                setIsHotButtonClicked(true);
                setTimeout(() => {
                  setIsHotButtonClicked(false);
                }, 2000);
                if (data.length === 1) {
                  window.localStorage.setItem("onBoardingKey", false);
                  setOnBoarding(false);
                }
              }}
            >
              <div
                className={`${styles.buttonClassHot} ${
                  !isHotButtonClicked && !HotactiveToolTip ? `block` : `hidden`
                } m-[8px]`}
              >
                <HotButtonSvg />
              </div>
              {HotactiveToolTip && !isHotButtonClicked && (
                <div className={`${styles.buttonClassHot} m-[8px]`}>
                  <HoverOnHotSvg />
                </div>
              )}

              <div
                className={`${styles.buttonClassHot} ${
                  isHotButtonClicked ? `block` : `hidden`
                } m-[8px]`}
              >
                <Image
                  src="https://static.plgworks.com/assets/images/non/vote/hotButtonClick.png"
                  alt="Lens Icon"
                  width="72"
                  height="72"
                />
              </div>
            </button>
          </>
        ) : null}
      </div>
    </>
  );
}

export default OnBoarding;
