import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Tabs } from "./components/Tabs/tabs";
import { PreviewTab } from "./views/preview/preview";
import { CodeTab } from "./views/code/code";
import { SettingsTab } from "./views/settings/settings";
import { TabContext } from "./context/tabContext";
import { TabOptions } from "./components/Tabs/tab.model";
import { optimize } from "svgo";
import { PresetDefaultOverrides } from "svgo/plugins/plugins-types";

function App() {
  // Initial state
  const url = new URL(window.location.href);
  const initialTheme = url.searchParams.get("theme");

  // State management
  const [theme, setTheme] = useState(initialTheme || null);

  const [tab, setTab] = useState<TabOptions>("preview");
  const tabContextData = useMemo(() => ({ tab, setTab }), [tab]);

  const [svg, SetSVG] = useState<string>();

  const [svgConfig, setSvgConfig] = useState<PresetDefaultOverrides>({});

  // Functions
  const handleTheme = (event: MessageEvent) => setTheme(event.data.content);

  // Event Handler
  useEffect(() => {
    const handleSelection = (event: MessageEvent) => {
      const svg: string = event.data.content;
      const optimizedSvgCode = optimize(svg, {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: svgConfig,
            },
          },
        ],
      });

      SetSVG(optimizedSvgCode.data);
    };

    const handleMessage = (event: MessageEvent) => {
      switch (event.data.type) {
        case "theme":
          handleTheme(event);
          break;
        case "selection":
          0;
          handleSelection(event);
          break;
        default:
          console.log(`Unknown event type: ${event.type}`);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [svgConfig]);

  // Template
  return (
    <TabContext.Provider value={tabContextData}>
      <div
        className="flex flex-col h-screen"
        data-theme={theme}
      >
        <Tabs />
        <main className="tabs-container flex flex-1">
          {tab === "preview" && <PreviewTab svg={svg} />}
          {tab === "code" && theme && (
            <CodeTab
              svg={svg}
              theme={theme}
            />
          )}
          {tab === "settings" && <SettingsTab />}
        </main>
      </div>
    </TabContext.Provider>
  );
}

export default App;
