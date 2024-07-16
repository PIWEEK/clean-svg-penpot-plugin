import classNames from "classnames";
import { TabOptions } from "./tab.model";
import "./tab.css";
import { useContext } from "react";
import { TabContext } from "../../context/tabContext";

type TabProps = {
  tabName: TabOptions;
  active: boolean;
};

export const Tab = ({ tabName, active }: TabProps) => {
  const { setTab } = useContext(TabContext);

  const handleTabClick = () => {
    setTab(tabName);
  };

  return (
    <button
      onClick={() => handleTabClick()}
      type="button"
      role="tab"
      className={classNames("tab", {
        active: active,
      })}
    >
      {tabName}
    </button>
  );
};
