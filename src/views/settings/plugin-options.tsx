import { PluginConfig } from "svgo";

export type PluginConfOption = {
  name: string;
  value: PluginConfig;
};

export type PluginConfOptions = PluginConfOption[];

export const pluginConfOptions: PluginConfOptions = [
  {
    name: "cleanupAttrs",
    value: "cleanupAttrs",
  },
  {
    name: "cleanupEnableBackground",
    value: "cleanupEnableBackground",
  },
  {
    name: "cleanupIds",
    value: "cleanupIds",
  },
  {
    name: "cleanupNumericValues",
    value: "cleanupNumericValues",
  },
  {
    name: "collapseGroups",
    value: "collapseGroups",
  },
  {
    name: "convertColors",
    value: "convertColors",
  },
  {
    name: "convertEllipseToCircle",
    value: "convertEllipseToCircle",
  },
  {
    name: "convertPathData",
    value: "convertPathData",
  },
  {
    name: "convertShapeToPath",
    value: "convertShapeToPath",
  },
  {
    name: "convertTransform",
    value: "convertTransform",
  },
  {
    name: "mergeStyles",
    value: "mergeStyles",
  },
  {
    name: "inlineStyles",
    value: "inlineStyles",
  },
  {
    name: "mergePaths",
    value: "mergePaths",
  },
  {
    name: "minifyStyles",
    value: "minifyStyles",
  },
  {
    name: "moveElemsAttrsToGroup",
    value: "moveElemsAttrsToGroup",
  },
  {
    name: "moveGroupAttrsToElems",
    value: "moveGroupAttrsToElems",
  },
  {
    name: "removeComments",
    value: "removeComments",
  },
  {
    name: "removeDesc",
    value: "removeDesc",
  },
  {
    name: "removeDoctype",
    value: "removeDoctype",
  },
  {
    name: "removeEditorsNSData",
    value: "removeEditorsNSData",
  },
  {
    name: "removeEmptyAttrs",
    value: "removeEmptyAttrs",
  },
  {
    name: "removeEmptyContainers",
    value: "removeEmptyContainers",
  },
  {
    name: "removeEmptyText",
    value: "removeEmptyText",
  },
  {
    name: "removeHiddenElems",
    value: "removeHiddenElems",
  },
  {
    name: "removeMetadata",
    value: "removeMetadata",
  },
  {
    name: "removeNonInheritableGroupAttrs",
    value: "removeNonInheritableGroupAttrs",
  },
  {
    name: "removeTitle",
    value: "removeTitle",
  },
  {
    name: "removeUnknownsAndDefaults",
    value: "removeUnknownsAndDefaults",
  },
  {
    name: "removeUnusedNS",
    value: "removeUnusedNS",
  },
  {
    name: "removeUselessDefs",
    value: "removeUselessDefs",
  },
  {
    name: "removeUselessStrokeAndFill",
    value: "removeUselessStrokeAndFill",
  },
  {
    name: "removeViewBox",
    value: "removeViewBox",
  },
  {
    name: "removeXMLProcInst",
    value: "removeXMLProcInst",
  },
  {
    name: "sortAttrs",
    value: "sortAttrs",
  },
  {
    name: "sortDefsChildren",
    value: "sortDefsChildren",
  },
  {
    name: "Cleanup List Of Values",
    value: "cleanupListOfValues",
  },
  {
    name: "convertOneStopGradients",
    value: "convertOneStopGradients",
  },
  {
    name: "prefixIds",
    value: "prefixIds",
  },
  {
    name: "removeDimensions",
    value: "removeDimensions",
  },
  {
    name: "removeOffCanvasPaths",
    value: "removeOffCanvasPaths",
  },
  {
    name: "removeRasterImages",
    value: "removeRasterImages",
  },
  {
    name: "removeScriptElement",
    value: "removeScriptElement",
  },
  {
    name: "removeStyleElement",
    value: "removeStyleElement",
  },
  {
    name: "removeXlink",
    value: "removeXlink",
  },
  {
    name: "removeXMLNS",
    value: "removeXMLNS",
  },
  {
    name: "reusePaths",
    value: "reusePaths",
  },
];
