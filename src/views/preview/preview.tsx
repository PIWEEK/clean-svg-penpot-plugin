import { useEffect } from "react";
import "./preview.css";
import { Shape } from "@penpot/plugin-types";

type TabProps = {
  shapes?: Shape[];
  svg?: string;
  onReady: () => void;
};

export const PreviewTab = ({ shapes, svg, onReady }: TabProps) => {
  useEffect(() => {
    onReady();
  }, []);

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
    <div className="preview-tab flex-1 bg-white">
      <div className="inner-tab flex flex-col p-4 rounded h-full">
        {svg ? (
          <>
            <div className="shape-name">
              {shapes
                ? `penpot-${shapes?.map((shape) => shape.name).join("-")}.svg`
                : "No shape selected"}
            </div>
            <div
              className="preview-shape flex justify-center items-center flex-1"
              dangerouslySetInnerHTML={{
                __html: svg as unknown as HTMLElement,
              }}></div>
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
          </>
        ) : (
          <div className="preview-shape flex justify-center items-center flex-1">
            Please select a shape from the viewport
          </div>
        )}
      </div>
    </div>
  );
};
