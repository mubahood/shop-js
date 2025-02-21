import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const ProfileEditHeader: FC = () => {
  const location = useLocation();

  return (
    <>
      <div className="d-block mb-3 text-center ">
        <div className="flex-grow-1">
          <div
            className="alert alert-primary alert-dismissible fade show text-center fw-bold py-3"
            role="alert"
          >
            You can update your profile in five steps: Personal Information,
            Education/Training, Employment, Additional Information, and
            Photograph. Please ensure all details are accurate to enhance your
            resume.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
          <div className="d-flex flex-wrap flex-stack justify-content-center">
            <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
              <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                <span className="fw-bold fs-6 text-gray-500">
                  Profile Compleation
                </span>
                <span className="fw-bolder fs-6">50%</span>
              </div>
              <div className="h-5px mx-3 w-100 bg-light mb-3">
                <div
                  className="bg-success rounded h-5px"
                  role="progressbar"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-none d-md-block mb-5 mb-xl-5 p-0 m-0">
        <div className="d-flex justify-content-center overflow-auto h-50px">
          <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === "/admin/profile-edit/bio" && "active")
                }
                to="/admin/profile-edit/bio"
              >
                Personal Information
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === "/admin/profile-edit/education" &&
                    "active")
                }
                to="/admin/profile-edit/education"
              >
                Education & Training
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === "/admin/profile-edit/employment" &&
                    "active")
                }
                to="/admin/profile-edit/employment"
              >
                Employment
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === "/admin/profile-edit/accomplishment" &&
                    "active")
                }
                to="/admin/profile-edit/accomplishment"
              >
                Accomplishment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export { ProfileEditHeader };
