import { Shape } from "@penpot/plugin-types";
import type { PluginMessageEvent } from "../models/message.model";

const onLoadPlugin = (
  name: string,
  url: string,
  options?: { width: number; height: number }
) => {
  penpot.ui.open(name, url, options);
  generateMarkupfromSelectedShapes();
};

// Removed incorrect penpot.ui.open call

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", content: theme });
});

const generateMarkupfromSelectedShapes = () => {
  const shapes: Shape[] = penpot.selection;
  console.log("shapes", shapes);
  const shape: Shape = shapes[0];
  const markup: string = penpot.generateMarkup([shape], { type: "svg" });
  sendMessage({ type: "selection", content: { shape, markup } });
};

penpot.on("selectionchange", () => {
  generateMarkupfromSelectedShapes();
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}

onLoadPlugin("CLEAN SVG", `?theme=${penpot.theme}`, {
  width: 500,
  height: 800,
});
