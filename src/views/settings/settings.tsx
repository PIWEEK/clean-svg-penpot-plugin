import { PluginConfig } from "svgo";
import { pluginConfOptions } from "./plugin-options";

type TabProps = {
  svg?: string;
  config?: PluginConfig[];
  onToggleOption: (target: HTMLInputElement, value: PluginConfig) => void;
};

export const SettingsTab = ({ svg, config, onToggleOption }: TabProps) => {
  return (
    <div className="wrapper">
      {svg ? (
        <>
          <div className="desc-tab caption mb-2">
            Safely remove default or suboptimal values from your SVG without
            affecting the rendering result.
          </div>
          <form className="form-options">
            {pluginConfOptions.map((option) => (
              <div className="checkbox-container">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  id={option.value as string}
                  name={option.value as string}
                  checked={config?.includes(option.value)}
                  onChange={(event) =>
                    onToggleOption(event.target, option.value)
                  }
                />
                <label
                  htmlFor={option.value as string}
                  className="body-small"
                  title={option.desc}
                >
                  {option.name}
                </label>
              </div>
            ))}
          </form>
        </>
      ) : (
        <div className="desc-tab body-small mb-2">
          Please select a shape from the viewport
        </div>
      )}
    </div>
  );
};
