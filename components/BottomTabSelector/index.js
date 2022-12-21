import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.scss";
import { TwitterShareButton, TelegramShareButton } from "react-share";
import TwitterIcon from "./svg/TwitterIcon";
import TelegramIcon from "./svg/TelegramIcon";
import QuestionMarkIcon from "./svg/QuestionMarkIcon";
import Link from "next/link";

export default function BottomTabSelector() {
  const { currentTab, onTabChange } = useBottomTab();
  const routesMap = {
    SubmitYourOwn: "/generate-image",
    Collect: "/collect",
    Vote: "/",
  };

  return (
    <div className="flex items-center self-end justify-between">
      <div className="flex items-center mt-[12px] md:mt-0">
        <QuestionMarkIcon />
        <span className="pl-[10px] text-[16px] text-[#fff]">
          How does this work?
        </span>
      </div>
      <div
        className={`${styles.container} grid grid-cols-3 content-center gap-[8px] p-[8px] md:rounded-[100px] w-2/3`}
      >
        {Object.values(TabItems).map((tab) => {
          const isSelected = tab.id === currentTab.id;
          const tabId = tab.id;
          return (
            <Link href={routesMap[tabId]} key={tab.id}>
              <div
                key={tab.id}
                onClick={() => onTabChange(tab)}
                id={tab.id}
                className={`${styles.tabContainer} ${
                  isSelected ? styles.selectedTab : {}
                }`}
                title={tab.tabName}
              >
                {tab.tabName}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="font-medium text-[16px] leading-[26px] text-[#ffffff99]">
        Made with <span className="text-[#FA5C00]">🧡</span> by PLG
      </div>
    </div>
  );
}
