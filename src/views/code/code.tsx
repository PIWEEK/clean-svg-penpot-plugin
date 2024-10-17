import { Shape } from "@penpot/plugin-types";
import "./code.css";

// Using ES6 import syntax
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import { lazy, Suspense } from "react";

// Then register the languages you need
hljs.registerLanguage("xml", xml);

type TabProps = {
  shapes?: Shape[];
  svg?: string;
  theme?: string;
};

export const CodeTab = ({ shapes, svg, theme }: TabProps) => {
  const CodeTabDarkTheme = lazy(() =>
    import("./components/dark-code").then(({ CodeTabDarkTheme }) => ({
      default: CodeTabDarkTheme,
    }))
  );

  const CodeTabLightTheme = lazy(() =>
    import("./components/light-code").then(({ CodeTabLightTheme }) => ({
      default: CodeTabLightTheme,
    }))
  );

  const code = () => {
    if (svg) {
      const code = `
<!-- ${shapes?.map((shape) => shape.name).join(", ")} -->
${svg}
`;
      const hightlightedCode = hljs.highlight(code, { language: "xml" }).value;
      return { __html: hightlightedCode };
    }
  };

  const downloadSvgFile = () => {
    if (svg) {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = shapes
        ? `penpot-${shapes?.map((shape) => shape.name).join("-")}.svg`
        : "shapes.svg";
      a.click();

      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="code-tab flex-1">
      <div className="inner-tab p-4 rounded h-full">
        {svg ? (
          <div className="code-wrapper">
            <pre>
              <code dangerouslySetInnerHTML={code()}></code>
            </pre>

            <button
              type="button"
              className="code-export fixed top-24 right-4"
              data-appearance="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="export icon w-4 h-4 cursor-pointer"
                onClick={downloadSvgFile}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line
                  x1="12"
                  y1="15"
                  x2="12"
                  y2="3"></line>
              </svg>
            </button>
          </div>
        ) : (
          <div className="code-wrapper">
            <pre>
              <code>Please select a shape from the viewport</code>
            </pre>
          </div>
        )}
        <Suspense fallback={null}>
          {theme === "dark" ? <CodeTabDarkTheme /> : <CodeTabLightTheme />}
        </Suspense>
      </div>
    </div>
  );
};
