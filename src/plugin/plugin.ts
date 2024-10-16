import { Shape } from "@penpot/plugin-types";
import type { PluginMessageEvent } from "../models/message.model";

penpot.ui.open("CLEAN SVG", `?theme=${penpot.theme}`, {
  width: 500,
  height: 800,
});

penpot.ui.onMessage((message) => {
  if (message === "interface-ready") {
    generateMarkupfromSelectedShapes();
  }
});

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", content: theme });
});

const generateMarkupfromSelectedShapes = () => {
  const shapes: Shape[] = penpot.selection;
  const svg: string = penpot.generateMarkup(shapes, { type: "svg" });
  sendMessage({ type: "selection", content: { svg } });
};

penpot.on("selectionchange", () => {
  generateMarkupfromSelectedShapes();
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}
