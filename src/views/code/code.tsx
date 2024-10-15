import "./code.css";

// Using ES6 import syntax
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import { lazy, Suspense } from "react";

// Then register the languages you need
hljs.registerLanguage("xml", xml);

type TabProps = {
  svg?: string;
  theme?: string;
};

export const CodeTab = ({ svg, theme }: TabProps) => {
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
      const hightlightedCode = hljs.highlight(svg, { language: "xml" }).value;
      return { __html: hightlightedCode };
    }
  };

  async function writeClipboardText() {
    try {
      if (svg) {
        await navigator.clipboard.writeText(svg);
      }
    } catch (error: unknown) {
      console.error("no se puede copiar");
    }
  }

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
              data-appearance="secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="export icon w-4 h-4 cursor-pointer"
                onClick={writeClipboardText}
              >
                <rect
                  x="9"
                  y="9"
                  width="13"
                  height="13"
                  rx="2"
                  ry="2"
                ></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
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
