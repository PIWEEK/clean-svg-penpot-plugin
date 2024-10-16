export interface ThemePluginEvent {
  type: "theme";
  content: string;
}

export interface SelectionData {
  svg: string;
}

export interface SelectionChangeEvent {
  type: "selection";
  content: SelectionData;
}

export type PluginMessageEvent = ThemePluginEvent | SelectionChangeEvent;
