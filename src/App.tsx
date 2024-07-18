import { ChangeEvent, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Tabs } from "./components/Tabs/tabs";
import { PreviewTab } from "./views/preview/preview";
import { CodeTab } from "./views/code/code";
import { SettingsTab } from "./views/settings/settings";
import { TabContext } from "./context/tabContext";
import { TabOptions } from "./components/Tabs/tab.model";
import { optimize, PluginConfig } from "svgo";

function App() {
  // Initial state
  const url = new URL(window.location.href);
  const initialTheme = url.searchParams.get("theme");

  const presetPlugins: PluginConfig[] = [
    "removeDoctype",
    "removeXMLProcInst",
    "removeComments",
    "removeMetadata",
    "removeEditorsNSData",
    "cleanupAttrs",
    "mergeStyles",
    "inlineStyles",
    "minifyStyles",
    "cleanupIds",
    "cleanupNumericValues",
    "convertColors",
    "removeUnknownsAndDefaults",
    "removeNonInheritableGroupAttrs",
    "removeUselessStrokeAndFill",
    "removeViewBox",
    "cleanupEnableBackground",
    "removeHiddenElems",
    "removeEmptyText",
    "convertShapeToPath",
    "convertEllipseToCircle",
    "moveElemsAttrsToGroup",
    "moveGroupAttrsToElems",
    "collapseGroups",
    "convertPathData",
    "convertTransform",
    "removeEmptyAttrs",
    "removeEmptyContainers",
    "removeUnusedNS",
    "mergePaths",
    "sortAttrs",
    "sortDefsChildren",
    "removeTitle",
    "removeDesc",
  ];

  // State management
  const [theme, setTheme] = useState(initialTheme || null);

  const [tab, setTab] = useState<TabOptions>("preview");
  const tabContextData = useMemo(() => ({ tab, setTab }), [tab]);

  const [svg, SetSVG] = useState<string>();

  const [svgConfig, setSvgConfig] = useState<PluginConfig[]>(presetPlugins);

  // Functions
  const handleTheme = (event: MessageEvent) => setTheme(event.data.content);

  useEffect(() => {
    if (svg) {
      optimize(svg, {
        multipass: true,
        js2svg: {
          indent: 4, // number
          pretty: true, // boolean
        },
        plugins: svgConfig,
      });
    }
  }, [svg, svgConfig]);

  // Event Handler
  useEffect(() => {
    const handleSelection = (event: MessageEvent) => {
      const svg: string = event.data.content;
      const optimizedSvgCode = optimize(svg, {
        multipass: true,
        js2svg: {
          indent: 4, // number
          pretty: true, // boolean
        },
        plugins: svgConfig,
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

  const handleConfig = (target: HTMLInputElement, value: PluginConfig) => {
    console.log(target, value);
    if (target.checked) {
      setSvgConfig([...svgConfig, value]);
    } else {
      setSvgConfig(svgConfig.filter((config) => config !== value));
    }
  };

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
          {tab === "settings" && (
            <SettingsTab
              config={svgConfig}
              onToggleOption={(target, value) => handleConfig(target, value)}
            />
          )}
        </main>
      </div>
    </TabContext.Provider>
  );
}

export default App;
