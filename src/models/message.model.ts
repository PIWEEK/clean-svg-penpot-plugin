import { Shape } from "@penpot/plugin-types";

export interface ThemePluginEvent {
  type: "theme";
  content: string;
}

export interface SelectionData {
  svgs: string[];
  shapes: Shape[];
}

export interface SelectionChangeEvent {
  type: "selection";
  content: SelectionData;
}

export type PluginMessageEvent = ThemePluginEvent | SelectionChangeEvent;
