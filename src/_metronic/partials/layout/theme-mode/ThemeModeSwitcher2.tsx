import React from "react";
import clsx from "clsx";
import { KTIcon } from "../../../helpers";
import { ThemeModeComponent } from "../../../assets/ts/layout";
import { ThemeModeType, useThemeMode } from "./ThemeModeProvider";

type Props = {
  toggleBtnClass?: string;
  toggleBtnIconClass?: string;
  menuPlacement?: string;
  menuTrigger?: string;
};

const systemMode = ThemeModeComponent.getSystemMode() as "light" | "dark";

const ThemeModeSwitcher2: React.FC<Props> = ({
  toggleBtnClass = "",
  toggleBtnIconClass = "fs-1",
  menuPlacement = "bottom-end",
  menuTrigger = '{default: "click", lg: "hover"}',
}) => {
  const { mode, menuMode, updateMode, updateMenuMode } = useThemeMode();

  // If user selected "system", figure out whether that's effectively light or dark
  const calculatedMode = mode === "system" ? systemMode : mode;

  // Switch between Light and Dark
  const switchMode = (_mode: ThemeModeType) => {
    updateMenuMode(_mode);
    updateMode(_mode);
  };

  // We'll show the label "Dark" or "Light" at the top-level
  const currentLabel = calculatedMode === "dark" ? "Dark" : "Light";

  return (
    <div
      className="menu-item px-5"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="bottom"
    >
      {/* Top-level link */}
      <a href="#" className="menu-link px-5">
        <span className="menu-title position-relative">
          Switch Theme
          <span className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">
            {currentLabel}
          </span>
        </span>
      </a>

      {/* Dropdown sub-menu */}
      <div
        className="menu-sub menu-sub-dropdown w-175px py-4"
        data-kt-menu="true"
      >
        {/* Dark Mode Item */}
        <div
          className="menu-item px-3"
          key="dark"
          onClick={() => switchMode("dark")}
        >
          <a
            href="#"
            className={clsx("menu-link d-flex px-5", {
              active: calculatedMode === "dark",
            })}
          >
            <span className="symbol symbol-20px me-4">
              <KTIcon iconName="moon" className={clsx(toggleBtnIconClass)} />
            </span>
            Dark
          </a>
        </div>

        {/* Light Mode Item */}
        <div
          className="menu-item px-3"
          key="light"
          onClick={() => switchMode("light")}
        >
          <a
            href="#"
            className={clsx("menu-link d-flex px-5", {
              active: calculatedMode === "light",
            })}
          >
            <span className="symbol symbol-20px me-4">
              <KTIcon
                iconName="night-day"
                className={clsx(toggleBtnIconClass)}
              />
            </span>
            Light
          </a>
        </div>
      </div>
    </div>
  );
};

export { ThemeModeSwitcher2 };
