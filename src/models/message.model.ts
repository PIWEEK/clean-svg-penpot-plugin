export interface ThemePluginEvent {
  type: "theme";
  content: string;
}

export interface SelectionChangeEvent {
  type: "selection";
  content: string;
}

export type PluginMessageEvent = ThemePluginEvent | SelectionChangeEvent;
