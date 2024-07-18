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

  return (
    <div className="code-tab flex-1">
      <div className="inner-tab flex p-4 rounded h-full">
        {svg && (
          <pre>
            <code dangerouslySetInnerHTML={code()}></code>
          </pre>
        )}
        <Suspense fallback={null}>
          {theme === "dark" ? <CodeTabDarkTheme /> : <CodeTabLightTheme />}
        </Suspense>
      </div>
    </div>
  );
};
