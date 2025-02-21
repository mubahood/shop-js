import clsx from "clsx";
import { useLayout } from "../../core";
import { Footer } from "./Footer";
import FooterSection from "../../../../app/pages/public/sections/FotterSection";

const FooterWrapper = () => {
  var current_url = window.location.href;
  var slits = current_url.split("/");
  //if contains 'admin' in slits, return null
  if (!slits.includes("admin")) {
    return <FooterSection />;
  }
  const { config } = useLayout();
  if (!config.app?.footer?.display) {
    return null;
  }

  return (
    <div className="app-footer" id="kt_app_footer">
      {config.app.footer.containerClass ? (
        <div
          className={clsx(
            "app-container",
            config.app.footer.container === "fixed"
              ? "container-xxl"
              : "container-fluid",
            config.app.footer.containerClass
          )}
        >
          <Footer />
        </div>
      ) : (
        <Footer />
      )}
    </div>
  );
};

export { FooterWrapper };
