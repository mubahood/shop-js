import { ILayout } from "./_Models";

export const DefaultConfig: ILayout = {
  layoutType: "light-sidebar",
  main: {
    componentName: "main",
    type: "default",
    pageBgWhite: false,
    iconType: "duotone",
  },
  app: {
    general: {
      componentName: "general",
      evolution: true,
      layoutType: "default",
      mode: "light",
      rtl: false,
      primaryColor: "#114786",
      pageBgWhite: false,
      pageWidth: "fixed",
    },
    header: {
      componentName: "header",
      display: true,
      default: {
        container: "fixed",
        containerClass: "d-flex align-items-center justify-content-center",
        fixed: {
          desktop: true,
          mobile: true,
        },
        content: "menu",
        menu: {
          display: true,
          iconType: "svg",
        },
      },
    },
    sidebar: {
      componentName: "sidebar",
      display: false,
      default: {
        class: "flex-column",
        push: {
          header: false,
          toolbar: false,
          footer: false,
        },
        drawer: {
          enabled: true,
          attributes: {
            "data-kt-drawer": "true",
            "data-kt-drawer-name": "app-sidebar",
            "data-kt-drawer-activate": "{default: true, lg: false}",
            "data-kt-drawer-overlay": "true",
            "data-kt-drawer-width": "225px",
            "data-kt-drawer-direction": "start",
            "data-kt-drawer-toggle": "#kt_app_sidebar_mobile_toggle",
          },
        },
        fixed: {
          desktop: false,
        },
        minimize: {
          desktop: {
            enabled: false,
            default: false,
            hoverable: false,
          },
        },
        menu: {
          iconType: "svg",
        },
      },
    },
    toolbar: {
      componentName: "toolbar",
      display: false,
      layout: "classic",
      class: "py-0 py-lg-0",
      container: "fixed",
      containerClass: "d-flex flex-stack",
      fixed: {
        desktop: false,
        mobile: false,
      },
      // custom settings,
      filterButton: true,
      daterangepickerButton: false,
      primaryButton: true,
      primaryButtonLabel: "Create",
      primaryButtonModal: "create-app",
    },
    pageTitle: {
      componentName: "page-title",
      display: true,
      breadCrumb: true,
      description: false,
      direction: "column",
    },
    content: {
      componentName: "content",
      container: "fixed",
      class: "p-0 ",
    },
    footer: {
      componentName: "footer",
      display: true,
      container: "fixed",
      containerClass:
        "d-flex flex-column flex-md-row flex-center flex-md-stack py-3",
      fixed: {
        desktop: false,
        mobile: false,
      },
    },
    pageLoader: {
      componentName: "page-loader",
      type: "none",
      logoImage: "logo-2.svg",
      logoClass: "mh-75px",
    },
  },
  illustrations: {
    componentName: "illustrations",
    set: "sketchy-1",
  },
  scrolltop: {
    componentName: "scrolltop",
    display: true,
  },
  engage: {
    componentName: "engage",
    demos: {
      enabled: true,
    },
    purchase: {
      enabled: false,
    },
  },
};
