import "./preview.css";
import { Shape } from "@penpot/plugin-types";

type TabProps = {
  shape: Shape | undefined;
  svg?: string;
};

export const PreviewTab = ({ shape, svg }: TabProps) => {
  const downloadSvgFile = () => {
    if (svg) {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = shape ? `${shape.name}.svg` : "shape.svg";
      a.click();

      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="preview-tab flex-1 bg-white">
      <div className="inner-tab flex  p-4 rounded h-full">
        {svg ? (
          <>
            <div className="shape-name">
              {shape ? shape.name : "No shape selected"}
            </div>
            <div
              className="preview-shape flex justify-center items-center flex-1"
              dangerouslySetInnerHTML={{
                __html: svg as unknown as SVGElement,
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
