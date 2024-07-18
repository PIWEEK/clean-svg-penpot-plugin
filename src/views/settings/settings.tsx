import { PluginConfig } from "svgo";
import { pluginConfOptions } from "./plugin-options";

type TabProps = {
  config?: PluginConfig[];
  onToggleOption: (target: HTMLInputElement, value: PluginConfig) => void;
};

export const SettingsTab = ({ config, onToggleOption }: TabProps) => {
  return (
    <form className="form-options">
      {pluginConfOptions.map((option) => (
        <div className="checkbox-container">
          <input
            className="checkbox-input"
            type="checkbox"
            id={option.value as string}
            name={option.value as string}
            checked={config?.includes(option.value)}
            onChange={(event) => onToggleOption(event.target, option.value)}
          />
          <label
            htmlFor={option.value as string}
            className="body-small"
          >
            {option.name}
          </label>
        </div>
      ))}
    </form>
  );
};
