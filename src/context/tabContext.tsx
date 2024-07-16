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

// import { createContext, ReactNode, useState } from "react";
// import { TabOptions } from "../components/Tabs/tab.model";

// interface ContextAggregatorType {
//   children: ReactNode;
// }

// interface TabContextValue {
//   tab: TabOptions;
// }

// const TabContext = createContext<TabContextValue>({tab: "preview"});

// const ContextAggregator = ({ children }: ContextAggregatorType) => {
//   const tab = useState<TabOptions>("preview");

//   return (
//     <TabContext.Provider value={ tab }>
//       {children}
//     </TabContext.Provider>
//   );
// };

// export { ContextAggregator, TabContext };
