import type { PluginMessageEvent } from "../models/message.model";

penpot.ui.open("CLEAN SVG", `?theme=${penpot.getTheme()}`, {
  width: 500,
  height: 800,
});

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", content: theme });
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}
