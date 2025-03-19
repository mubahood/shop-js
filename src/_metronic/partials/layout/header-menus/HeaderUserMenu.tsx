import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../app/modules/auth";
import { Languages } from "./Languages";
import { toAbsoluteUrl } from "../../../helpers";
import { ThemeModeSwitcher } from "../theme-mode/ThemeModeSwitcher";
import { ThemeModeSwitcher2 } from "../theme-mode/ThemeModeSwitcher2";
import Utils from "../../../../app/services/Utils";

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth();
  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column   rounded-0 menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">
                Hello
              </span>{" "}
              &nbsp;
              {currentUser?.last_name}
            </div>
            <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>
      <div className="separator my-2"></div>
      <div className="menu-item px-5">
        <Link to="admin" className="menu-link px-5">
          My Dashboard
        </Link>
      </div>
      <div className="menu-item px-5">
        <Link to={"/admin/my-orders"} className="menu-link px-5">
          <span className="menu-text">My Orders</span>
         
        </Link>
      </div>
  
      <div className="separator my-2"></div>
      <div className="menu-item px-5">
        <a onClick={logout} className="menu-link px-5">
          Sign Out
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
