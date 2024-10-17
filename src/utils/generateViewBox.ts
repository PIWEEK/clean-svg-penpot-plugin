const generateViewBox = (svgList: string[]) => {
  const minMaxCoords = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
  };

  svgList.forEach((svg) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, "image/svg+xml");
    const elements = doc.querySelectorAll("*");

    function traverseElements(elements: Element[]) {
      elements.forEach((element) => {
        const x = element.getAttribute("x");
        const y = element.getAttribute("y");
        const cx = element.getAttribute("cx");
        const cy = element.getAttribute("cy");
        const width = element.getAttribute("width");
        const height = element.getAttribute("height");
        const rx = element.getAttribute("rx");
        const ry = element.getAttribute("ry");

        if (x) {
          minMaxCoords.minX = Math.min(minMaxCoords.minX, parseFloat(x));
          minMaxCoords.maxX = Math.max(
            minMaxCoords.maxX,
            parseFloat(x) + (width ? parseFloat(width) : 0)
          );
        }

        if (y) {
          minMaxCoords.minY = Math.min(minMaxCoords.minY, parseFloat(y));
          minMaxCoords.maxY = Math.max(
            minMaxCoords.maxY,
            parseFloat(y) + (height ? parseFloat(height) : 0)
          );
        }

        if (cx) {
          minMaxCoords.minX = Math.min(
            minMaxCoords.minX,
            parseFloat(cx) - (rx ? parseFloat(rx) : 0)
          );
          minMaxCoords.maxX = Math.max(
            minMaxCoords.maxX,
            parseFloat(cx) + (rx ? parseFloat(rx) : 0)
          );
        }

        if (cy) {
          minMaxCoords.minY = Math.min(
            minMaxCoords.minY,
            parseFloat(cy) - (ry ? parseFloat(ry) : 0)
          );
          minMaxCoords.maxY = Math.max(
            minMaxCoords.maxY,
            parseFloat(cy) + (ry ? parseFloat(ry) : 0)
          );
        }

        if (element.children.length > 0) {
          traverseElements(Array.from(element.children));
        }
      });
    }

    traverseElements(Array.from(elements));
  });

  const width = minMaxCoords.maxX - minMaxCoords.minX;
  const height = minMaxCoords.maxY - minMaxCoords.minY;

  return {
    x: minMaxCoords.minX,
    y: minMaxCoords.minY,
    width,
    height,
  };
};

export default generateViewBox;
