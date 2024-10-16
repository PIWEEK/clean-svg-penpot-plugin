import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Tabs } from "./components/Tabs/tabs";
import { CodeTab } from "./views/code/code";
import { SettingsTab } from "./views/settings/settings";
import { TabContext } from "./context/tabContext";
import { TabOptions } from "./components/Tabs/tab.model";
import { optimize, PluginConfig } from "svgo";
import "@penpot/plugin-styles/styles.css";
import { Shape } from "@penpot/plugin-types";
import svgMerge from "./utils/svg-merge";
import { PreviewTab } from "./views/preview/preview";

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

  const [tab, setTab] = useState<TabOptions>("code");
  const tabContextData = useMemo(() => ({ tab, setTab }), [tab]);

  const [shapes, SetShapes] = useState<Shape[]>();
  const [svgs, SetSVGS] = useState<string[]>();
  const [mergedSVG, SetMergedSVG] = useState<string>();

  const [svgConfig, setSvgConfig] = useState<PluginConfig[]>(presetPlugins);

  // Functions
  const handleTheme = (event: MessageEvent) => setTheme(event.data.content);

  useEffect(() => {
    if (svgs) {
      const optimizedSvgs = svgs.map((svg) => {
        const optimized = optimize(svg, {
          multipass: true,
          js2svg: {
            indent: 4,
            pretty: true,
          },
          plugins: svgConfig,
        }).data;
        return optimized;
      });
      const mergedSVGS = svgMerge(optimizedSvgs);
      SetMergedSVG(mergedSVGS);
    }
  }, [svgs, svgConfig]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      switch (event.data.type) {
        case "theme":
          handleTheme(event);
          break;
        case "selection":
          SetSVGS(event.data.content.svgs);
          SetShapes(event.data.content.shapes);
          break;
        default:
          console.log(`Unknown event type: ${event.type}`);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleConfig = (target: HTMLInputElement, value: PluginConfig) => {
    if (target.checked) {
      const configValues = [...svgConfig, value];
      setSvgConfig(configValues);
    } else {
      const configValues = svgConfig.filter((config) => config !== value);
      setSvgConfig(configValues);
    }
  };

  const handlePreviewReady = () => {
    parent.postMessage("interface-ready", "*");
  };

  // Template
  return (
    <TabContext.Provider value={tabContextData}>
      <div
        className="flex flex-col h-screen"
        data-theme={theme}>
        <Tabs />
        <main className="tabs-container flex flex-1">
          {tab === "preview" && (
            <PreviewTab
              shapes={shapes}
              svg={mergedSVG}
              onReady={handlePreviewReady}
            />
          )}
          {tab === "code" && theme && (
            <CodeTab
              shapes={shapes}
              svg={mergedSVG}
              theme={theme}
            />
          )}
          {tab === "settings" && (
            <SettingsTab
              svg={mergedSVG}
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
