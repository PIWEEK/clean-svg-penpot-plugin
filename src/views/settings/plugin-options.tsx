import { PluginConfig } from "svgo";

export type PluginConfOption = {
  name: string;
  value: PluginConfig;
  desc?: string;
};

export type PluginConfOptions = PluginConfOption[];

export const pluginConfOptions: PluginConfOptions = [
  {
    name: "Remove doctype",
    value: "removeDoctype",
    desc: "Removes the Document Type Definition, also known as the DOCTYPE, from the document.",
  },
  {
    name: "remove XML",
    value: "removeXMLProcInst",
    desc: "Removes the XML declaration from the document.",
  },
  {
    name: "Remove Comments",
    value: "removeComments",
    desc: "Removes XML comments from the document. Doesn't effect rendering",
  },
  {
    name: "Remove Metadata",
    value: "removeMetadata",
    desc: "Removes the <metadata> element from the document. Doesn't effect rendering",
  },
  {
    name: "Remove XMLNS",
    value: "removeXMLNS",
    desc: "Removes the xmlns attribute from the top-most <svg> element in the document. This plugin renders SVGs unusable as standalone assets, in HTML <img> elements, or CSS pseudo-elements.",
  },
  {
    name: "Remove Editor Data",
    value: "removeEditorsNSData",
    desc: "Removes all XML namespaces, elements, and attributes associated with popular vector editing software.",
  },
  {
    name: "Cleanup attribute whitespace",
    value: "cleanupAttrs",
    desc: "Removes redundant whitespaces from attribute values.",
  },
  {
    name: "Merge styles",
    value: "mergeStyles",
    desc: "Merge multiple <style> elements into one.",
  },
  {
    name: "Inline styles",
    value: "inlineStyles",
    desc: "Merges styles from <style> elements to the style attribute of matching elements.",
  },
  {
    name: "Minify styles",
    value: "minifyStyles",
    desc: "Minify <style> elements with CSSO.",
  },
  {
    name: "Convert style to XML attributes",
    value: "convertStyleToAttrs",
    desc: "Converts presentation attributes in element styles to the equvilent XML attribute.",
  },
  {
    name: "Cleanup Ids",
    value: "cleanupIds",
    desc: "Removes unused IDs, and minifys IDs that are referenced by other elements.",
  },
  {
    name: "Remove raster images",
    value: "removeRasterImages",
    desc: "Removes inline JPEGs, PNGs, and GIFs from the document.",
  },
  {
    name: "Remove useless defs",
    value: "removeUselessDefs",
    desc: "Removes children of <defs> element that do not have an ID to reference.",
  },
  {
    name: "Round/rewrite numbers",
    value: "cleanupNumericValues",
    desc: "Rounds numeric values, and removes the unit when it's px as this is the default.",
  },
  {
    name: "Round/rewrite number lists",
    value: "cleanupListOfValues",
    desc: "Rounds numeric values in attributes, such as those found in viewBox, enable-background, and points.",
  },
  {
    name: "Minify colours",
    value: "convertColors",
    desc: "Converts color references to the shortest equivalent.",
  },
  {
    name: "Remove unknowns & defaults",
    value: "removeUnknownsAndDefaults",
    desc: "Removes unknown elements and attributes, as well as attributes that are set to their default value",
  },
  {
    name: "Remove unneeded group attrs",
    value: "removeNonInheritableGroupAttrs",
    desc: "Removes non-inheritable presentation attributes from groups.",
  },
  {
    name: "Remove useless stroke & fill",
    value: "removeUselessStrokeAndFill",
    desc: "Removes useless stroke and fill attributes. For example, in most cases assigning a stroke color is redundant if the elements stroke-width or stroke-opacity is 0.",
  },
  {
    name: "Remove viewBox",
    value: "removeViewBox",
    desc: "Removes the viewBox attribute where it matches the documents width and height. Warning: prevents SVGs from scaling, so they will not fill their parent container, or may clip if the container is too small.",
  },
  {
    name: "Remove/tidy enable-background",
    value: "cleanupEnableBackground",
    desc: "Cleans up enable-background, unless the document uses <filter> elements.",
  },
  {
    name: "removeEmptyText",
    value: "removeEmptyText",
    desc: "Removes empty <text> and <tspan> elements, and <tref> elements that don't reference another node in the document.",
  },
  {
    name: "Shapes to (smaller) paths",
    value: "convertShapeToPath",
    desc: "Convert basic shapes to <path> elements.",
  },
  {
    name: "Move attrs to parent group",
    value: "moveElemsAttrsToGroup",
    desc: "Move an elements attributes to their enclosing group.",
  },
  {
    name: "Move group attrs to elements",
    value: "moveGroupAttrsToElems",
    desc: "Move some group attributes to the contained elements.",
  },
  {
    name: "Collapse useless groups",
    value: "collapseGroups",
    desc: "Finds groups that effectively do nothing and flattens them, preserving the contents of the groups.",
  },
  {
    name: "Round/rewrite paths",
    value: "convertPathData",
    desc: "Optimize path commands found in <path>, <glyph>, and <missing-glyph> elements. Path commands are the syntax used in the d attribute, each character represents an instruction to draw paths.",
  },
  {
    name: "Convert non-eccentric <ellipse> to <circle>",
    value: "convertEllipseToCircle",
    desc: "Convert non-eccentric <ellipse> elements to <circle> elements.",
  },

  {
    name: "Round/rewrite transforms",
    value: "convertTransform",
    desc: "Collapse multiple transforms into one, convert matrices to the short aliases, and much more.",
  },
  {
    name: "Remove hidden elements",
    value: "removeHiddenElems",
    desc: "Remove hidden or invisible elements from the document. This can be elements with 0 width and height defined, or elements that were just hidden with CSS.",
  },
  {
    name: "Remove empty attrs",
    value: "removeEmptyAttrs",
    desc: "Remove empty attributes from elements in the document.",
  },
  {
    name: "Remove empty containers",
    value: "removeEmptyContainers",
    desc: "Remove container elements in the document that have no children or meaningful attributes, excluding the <svg> element which is ignored.",
  },
  {
    name: "Merge paths",
    value: "mergePaths",
    desc: "Merge multiple paths into one.",
  },
  {
    name: "remove unused namespace",
    value: "removeUnusedNS",
    desc: "Removes unused namespace declarations from the document.",
  },
  {
    name: "Replace duplicate elements with links",
    value: "reusePaths",
    desc: "Removes unused namespace declarations from the document.",
  },
  {
    name: "Sort attrs",
    value: "sortAttrs",
    desc: "Sorts attributes in all elements in the document. This does not reduce the size of the SVG, but improves readability and may improve how compression algorithms perform on it.",
  },
  {
    name: "Sort children of <defs>",
    value: "sortDefsChildren",
    desc: "Sorts all children in the <defs> element. This does not reduce the size of the SVG, but may improve how compression algorithms perform on it.",
  },
  {
    name: "Remove <title>",
    value: "removeTitle",
    desc: "Removes the <title> element from the document.",
  },
  {
    name: "Remove <desc>",
    value: "removeDesc",
    desc: "Removes the <desc> element from the document when useless",
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
    name: "Prefer viewBox to width/height",
    value: "removeDimensions",
    desc: "Removes the width and height attribute from the top-most <svg> element if specified, and replaces it with the viewBox attribute if it's missing.",
  },
  {
    name: "Remove style elements",
    value: "removeStyleElement",
    desc: "Remove all <style> elements from the document.",
  },
  {
    name: "Remove script elements",
    value: "removeScriptElement",
    desc: "Removes all scripts from the document. This will break interactive SVGs that rely on JavaScript.",
  },
  {
    name: "Remove out-of-bounds paths",
    value: "removeOffCanvasPaths",
    desc: "If a viewBox is present, removes <path> elements that are drawn outside of it.",
  },
  {
    name: "Removes XLink namespace",
    value: "removeXlink",
    desc: "Removes XLink namespace prefixes and converts references to XLink attributes to the native SVG equivalent",
  },
];
