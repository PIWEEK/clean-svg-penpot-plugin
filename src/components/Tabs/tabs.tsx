import { useContext } from "react";
import { Tab } from "./tab";
import "./tabs.css";
import { TabContext } from "../../context/tabContext";

export const Tabs = () => {
  const { tab } = useContext(TabContext);

  return (
    <div
      role="tablist"
      className="nav-tabs">
      <Tab
        tabName="preview"
        active={tab === "preview"}></Tab>
      <Tab
        tabName="code"
        active={tab === "code"}></Tab>
      <Tab
        tabName="settings"
        active={tab === "settings"}></Tab>
    </div>
  );
};
