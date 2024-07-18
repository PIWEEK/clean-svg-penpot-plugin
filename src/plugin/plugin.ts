import { PenpotShape } from "@penpot/plugin-types";
import type { PluginMessageEvent } from "../models/message.model";

penpot.ui.open("CLEAN SVG", `?theme=${penpot.getTheme()}`, {
  width: 500,
  height: 800,
});

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", content: theme });
});

penpot.on("selectionchange", () => {
  const shapes: PenpotShape[] = penpot.getSelectedShapes();
  const markup: string = penpot.generateMarkup(shapes, { type: "svg" });
  sendMessage({ type: "selection", content: markup });
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}
