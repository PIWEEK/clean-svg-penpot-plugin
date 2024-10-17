import { DOMParser, XMLSerializer } from "xmldom";
import generateViewBox from "./generateViewBox";

const svgMerge = (sgvs: string[]) => {
  const SVGMap = sgvs.map((svg) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, "image/svg+xml");
    const svgElement = doc.documentElement;
    const group = doc.createElement("g");
    const svgInner = svgElement.cloneNode(true);
    group.appendChild(svgInner);
    const serializer = new XMLSerializer();
    const content = serializer.serializeToString(group);
    return content.replace(/<svg[^<]*/, "").replace(/<\/?svg>/g, "");
  });

  const viewBox = generateViewBox(sgvs);

  const svg = [];
  svg.push(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${viewBox.x} ${viewBox.y} ${viewBox.height} ${viewBox.width}">`
  );
  for (const vector of SVGMap) {
    svg.push(vector);
  }
  svg.push("</svg>");

  const svgText = svg.join("\n");
  console.log("svgText", svgText);

  return svgText;
};

export default svgMerge;
