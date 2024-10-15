import { PenpotShape } from "@penpot/plugin-types";

export interface ThemePluginEvent {
  type: "theme";
  content: string;
}

export interface SelectionData {
  shape: PenpotShape;
  markup: string;
}

export interface SelectionChangeEvent {
  type: "selection";
  content: SelectionData;
}

export type PluginMessageEvent = ThemePluginEvent | SelectionChangeEvent;
