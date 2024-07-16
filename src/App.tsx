import { useMemo, useState } from "react";
import "./App.css";
import { Tabs } from "./components/Tabs/tabs";
import { PreviewTab } from "./views/preview/preview";
import { CodeTab } from "./views/code/code";
import { SettingsTab } from "./views/settings/settings";
import { TabContext } from "./context/tabContext";
import { TabOptions } from "./components/Tabs/tab.model";

function App() {
  // Initial state
  const url = new URL(window.location.href);
  const initialTheme = url.searchParams.get("theme");

  // State management
  const [theme, setTheme] = useState(initialTheme || null);

  const [tab, setTab] = useState<TabOptions>("preview");
  const value = useMemo(() => ({ tab, setTab }), [tab]);

  // Functions
  window.addEventListener("message", (event) => {
    if (event.data.type === "theme") {
      setTheme(event.data.content);
    }
  });

  // Template
  return (
    <TabContext.Provider value={value}>
      <div data-theme={theme}>
        <Tabs />
        <div className="tabs-container">
          {tab === "preview" && <PreviewTab />}
          {tab === "code" && <CodeTab />}
          {tab === "settings" && <SettingsTab />}
        </div>
      </div>
    </TabContext.Provider>
  );
}

export default App;
