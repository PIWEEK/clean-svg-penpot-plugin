export interface ThemePluginEvent {
  type: "theme";
  content: string;
}

export type PluginMessageEvent = ThemePluginEvent;
