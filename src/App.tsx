import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Tabs } from "./components/Tabs/tabs";
import { PreviewTab } from "./views/preview/preview";
import { CodeTab } from "./views/code/code";
import { SettingsTab } from "./views/settings/settings";
import { TabContext } from "./context/tabContext";
import { TabOptions } from "./components/Tabs/tab.model";
import { optimize, PluginConfig } from "svgo";
import "@penpot/plugin-styles/styles.css";

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
      const optimizedSvgCode = optimize(svg, {
        multipass: true,
        js2svg: {
          indent: 4, // number
          pretty: true, // boolean
        },
        plugins: svgConfig,
      });
      SetSVG(optimizedSvgCode.data);
    }
  }, [svg, svgConfig]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      switch (event.data.type) {
        case "theme":
          handleTheme(event);
          break;
        case "selection":
          console.log("aaaaaaaaaaa");
          SetSVG(event.data.content);
          break;
        default:
          console.log(`Unknown event type: ${event.type}`);
      }
    };
    window.addEventListener("message", handleMessage);
  }, []);

  const handleConfig = (target: HTMLInputElement, value: PluginConfig) => {
    if (target.checked) {
      const configValues = [...svgConfig, value];
      setSvgConfig(configValues);
    } else {
      console.log("unchecked");
      const configValues = svgConfig.filter((config) => config !== value);
      setSvgConfig(configValues);
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
