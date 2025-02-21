import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { HeaderUserMenu } from "../../../partials";
import { useLayout } from "../../core";
import { useAuth } from "../../../../app/modules/auth";
import Utils from "../../../../app/services/Utils";

const Navbar = () => {
  const { config } = useLayout();
  const { currentUser } = useAuth();

  // Common classes
  const itemClass = "ms-1 ms-md-4";
  const userAvatarClass = "symbol-35px";
  const btnIconClass = "fs-2";

  return (
    <div className="app-navbar flex-shrink-0">
      {/* User Section: either Avatar & Menu (if logged in) or Login & Create Account (if not) */}
      <div className={clsx("app-navbar-item", itemClass)}>
        {currentUser ? (
          <>
            <div
              className={clsx("cursor-pointer symbol", userAvatarClass)}
              data-kt-menu-trigger="{default: 'click'}"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
            >
              <img src={Utils.img(currentUser.avatar)} alt="" />
            </div>
            <HeaderUserMenu />
          </>
        ) : (
          <>
            <Link
              to="auth/login"
              className="btn btn-outline btn-outline-primary btn-sm me-2"
            >
              Login
            </Link>
            <Link to="auth/register" className="btn btn-primary btn-sm">
              Create Account
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle: Only shows if the header menu is displayed in config */}
      {config.app?.header?.default?.menu?.display && (
        <div
          className="app-navbar-item d-lg-none ms-2 me-n3"
          title="Show header menu"
        >
          <div
            className="btn btn-icon btn-active-color-primary w-35px h-35px"
            id="kt_app_header_menu_toggle"
          >
            <KTIcon iconName="text-align-left" className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  );
};

export { Navbar };
