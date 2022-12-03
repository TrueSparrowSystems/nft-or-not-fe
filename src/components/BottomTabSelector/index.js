import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.css";

export default function BottomTabSelector() {
  const {currentTab, onTabChange} = useBottomTab()
  return (
    <div className={styles.container}>
      {Object.values(TabItems).map((tab) => {
        const isSelected = tab.id === currentTab.id;
        return (
          <div
            onClick={() => onTabChange(tab)}
            id={tab.id}
            className={`${styles.tabContainer} ${
              isSelected ? styles.selectedTab : {}
            }`}
          >
            <div>{tab.tabName}</div>
          </div>
        );
      })}
    </div>
  );
}
