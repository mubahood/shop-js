import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { Zoom } from "react-toastify";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem to="/admin" title="My Dashboard" hasBullet={true} />

      <SidebarMenuItem
        to="/admin/my-orders"
        title="My Orders"
        hasBullet={true}
      />
    </>
  );
};

export { SidebarMenuMain };
