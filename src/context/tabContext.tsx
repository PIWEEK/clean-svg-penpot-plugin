import { createContext } from "react";
import { TabOptions } from "../components/Tabs/tab.model";

interface TabContextValue {
  tab: TabOptions;
  setTab: React.Dispatch<TabOptions>;
}

export const TabContext = createContext<TabContextValue>({
  tab: "preview",
  setTab: () => {},
});
