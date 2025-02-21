import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { Zoom } from "react-toastify";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/admin"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItemWithSub
        to="/crafted/pages/profile"
        title="Manage My Profile"
        hasBullet={false}
        icon="media/icons/duotune/general/gen011.svg"
        fontIcon="bi-app-indicator"
      >
        <SidebarMenuItem
          to="/admin/profile-edit/photo"
          title="Profile Photo"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/profile-edit/bio"
          title="Biodata"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/profile-edit/education"
          title="Education & Trainings"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/profile-edit/employment"
          title="Employment"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/profile-edit/accomplishment"
          title="Accomplishments"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/my-cv"
          title="View my profile"
          hasBullet={true}
        />
        {/* <SidebarMenuItem
          to="/admin/profile-edit/accomplishment"
          title="Download my CV"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/profile-edit/accomplishment"
          title="Email my CV"
          hasBullet={true}
        /> */}
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/crafted/pages/profile"
        title="My Activities"
        hasBullet={false}
        icon="media/icons/duotune/maps/map009.svg"
        fontIcon="bi-app-indicator"
      >
        <SidebarMenuItem
          to="/admin/my-job-applications"
          title="My Job Applications"
          hasBullet={true}
        />

        <SidebarMenuItem
          to="/admin/my-job-interviews"
          title="Shortlisted "
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/my-job-offers"
          title="My Job Offers"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/my-company-follows"
          title="Followed Companies"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/my-cv-views"
          title="My CV views"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/company/"
        title="Company activities"
        hasBullet={false}
        icon="media/icons/duotune/general/gen019.svg"
        fontIcon="bi-app-indicator"
      >
        <SidebarMenuItem
          to="/admin/job-create"
          title="Post a Job"
          hasBullet={true}
        />

        <SidebarMenuItem
          to="/admin/company-jobs"
          title="Posted Jobs"
          hasBullet={true}
        />

        <SidebarMenuItem
          to="/admin/company-job-applications"
          title="Job Applications"
          hasBullet={true}
        />

        <SidebarMenuItem
          to="/admin/company-profile-edit"
          title="Company Profile"
          hasBullet={true}
        />

        <SidebarMenuItem
          to="/admin/company-job-offers"
          title="Job Offers"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/company-followers"
          title="Company Followers"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/company-profile-views"
          title="Company Profile Views"
          hasBullet={true}
        />
       
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/crafted/pages/profile"
        title="8Learning"
        hasBullet={false}
        icon="media/icons/duotune/graphs/gra006.svg"
        fontIcon="bi-app-indicator"
      >
        <SidebarMenuItem
          to="/admin/job-create"
          title="My Courses"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/crafted/pages/profile"
        title="My Account"
        hasBullet={false}
        icon="media/icons/duotune/communication/com006.svg"
        fontIcon="bi-app-indicator"
      >
        <SidebarMenuItem
          to="/admin/job-create"
          title="Update Email"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/job-create"
          title="Change password"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/admin/job-create"
          title="Logout"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem
        to="/admin/job-create"
        title="Help Videos"
        hasBullet={true}
      />

      {/*
      <SidebarMenuItem
        to="/builder"
        icon="switch"
        title="Layout Builder"
        fontIcon="bi-layers"
      />{" "}
      
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Crafted
          </span>
        </div>
      </div>
    <SidebarMenuItemWithSub
        to="/crafted/pages"
        title="Pages"
        fontIcon="bi-archive"
        icon="element-plus"
      >
        <SidebarMenuItemWithSub
          to="/crafted/pages/profile"
          title="Profile"
          hasBullet={true}
        >
          <SidebarMenuItem
            to="/crafted/pages/profile/overview"
            title="Overview"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/projects"
            title="Projects"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/campaigns"
            title="Campaigns"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/documents"
            title="Documents"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/connections"
            title="Connections"
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub
          to="/crafted/pages/wizards"
          title="Wizards"
          hasBullet={true}
        >
          <SidebarMenuItem
            to="/crafted/pages/wizards/horizontal"
            title="Horizontal"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/wizards/vertical"
            title="Vertical"
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/crafted/accounts"
        title="Accounts"
        icon="profile-circle"
        fontIcon="bi-person"
      >
        <SidebarMenuItem
          to="/crafted/account/overview"
          title="Overview"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/account/settings"
          title="Settings"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/error"
        title="Errors"
        fontIcon="bi-sticky"
        icon="cross-circle"
      >
        <SidebarMenuItem to="/error/404" title="Error 404" hasBullet={true} />
        <SidebarMenuItem to="/error/500" title="Error 500" hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/crafted/widgets"
        title="Widgets"
        icon="element-7"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem
          to="/crafted/widgets/lists"
          title="Lists"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/statistics"
          title="Statistics"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/charts"
          title="Charts"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/mixed"
          title="Mixed"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/tables"
          title="Tables"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/feeds"
          title="Feeds"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Apps
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to="/apps/chat"
        title="Chat"
        fontIcon="bi-chat-left"
        icon="message-text-2"
      >
        <SidebarMenuItem
          to="/apps/chat/private-chat"
          title="Private Chat"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/apps/chat/group-chat"
          title="Group Chart"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/apps/chat/drawer-chat"
          title="Drawer Chart"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to="/apps/user-management/users"
        icon="abstract-28"
        title="User management"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="orders-create"
        icon="abstract-20"
        title="Create New Orders"
        fontIcon="bi-layers"
      />
      <div className="menu-item">
        <a
          target="_blank"
          className="menu-link"
          href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL + "/changelog"}
        >
          <span className="menu-icon">
            <KTIcon iconName="code" className="fs-2" />
          </span>
          <span className="menu-title">
            Changelog {import.meta.env.VITE_APP_VERSION}
          </span>
        </a>
      </div> */}
    </>
  );
};

export { SidebarMenuMain };
