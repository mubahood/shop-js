import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { HeaderUserMenu } from "../../../partials";
import { useLayout } from "../../core";
import { useAuth } from "../../../../app/modules/auth";
import Utils from "../../../../app/services/Utils";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { config } = useLayout();
  const { currentUser, cartItems } = useAuth();
  const cartItemsCount = cartItems ? cartItems.length : 0;

  // Common classes for spacing
  const itemClass = "ms-1 ms-md-4";
  const userAvatarClass = "symbol-35px";
  const btnIconClass = "fs-2";

  return (
    <div className="app-navbar flex-shrink-0 d-flex align-items-center">
      {/* Cart Icon with Real Cart Count */}
      <div
        className={clsx("menu-item me-5", itemClass)}
        style={{ position: "relative" }}
      >
        <Link
          to="/cart"
          className="btn btn-icon btn-active-color-primary p-0"
          style={{ border: "none", background: "none" }}
        >
          <FaShoppingCart size={25} style={{ color: "#114786" }} />
          {cartItemsCount > 0 && (
            <span
              style={{
                backgroundColor: "#f33d02",
                color: "#fff",
                fontWeight: "bold",
                paddingLeft: "6px",
                width: "20px",
                height: "20px",
                position: "absolute",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                // border radius 110
                borderRadius: "110px",
                top: -0,
                right: -0,
                fontSize: "1rem",
              }}
            >
              {cartItemsCount}
            </span>
          )}
        </Link>
      </div>

      {/* User Section */}
      <div className={clsx("menu-item", itemClass)}>
        {currentUser ? (
          <>
            <div
              className={clsx("cursor-pointer symbol", userAvatarClass)}
              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
            >
              <FaRegUser size={25} className="text-primary" />
            </div>
            <HeaderUserMenu />
          </>
        ) : (
          <>
            <Link
              to="/auth/login"
              className="btn btn-outline btn-outline-primary btn-sm me-2"
            >
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-primary btn-sm">
              Create Account
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      {config.app?.header?.default?.menu?.display && (
        <div
          className="menu-item d-lg-none ms-2 me-n3"
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
