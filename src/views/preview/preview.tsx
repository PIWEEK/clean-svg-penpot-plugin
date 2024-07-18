import "./preview.css";

type TabProps = {
  svg?: string;
};

export const PreviewTab = ({ svg }: TabProps) => {
  return (
    <div className="preview-tab flex-1 bg-white">
      <div className="inner-tab flex  p-4 rounded h-full">
        {svg && (
          <div
            className="preview-shape flex justify-center items-center flex-1"
            dangerouslySetInnerHTML={{ __html: svg as unknown as SVGElement }}
          ></div>
        )}
      </div>
    </div>
  );
};
