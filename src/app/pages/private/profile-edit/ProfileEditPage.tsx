// src/pages/admin/ProfileEditPage.tsx

// Import Statements
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { ProfileEditHeader } from "./ProfileEditHeader";
import ProfileEditEducation from "./components/ProfileEditEducation";
import { useAuth } from "../../../modules/auth";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ProfileModel } from "../../../models/ProfileModel";
import { ProfileEditProvider, useProfileEdit } from "./ProfileEditContext";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import ProfileEditBio from "./components/ProfileEditBio";
import ProfileEditEmployment from "./components/ProfileEditEmployment";
import ProfileEditAccomplishment from "./components/ProfileEditAccomplishmenttsx";
import ProfileEditPhoto from "./components/ProfileEditPhoto";

// Define PageLink Type
interface PageLink {
  title: string;
  path: string;
  isSeparator: boolean;
  isActive: boolean;
}

// Functional Component
const ProfileEditPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Define breadcrumbs inside the component
  const profileBreadCrumbs: Array<PageLink> = [
    {
      title: "Profile",
      path: "/admin/profile-edit/bio",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return (
    <ProfileEditProvider>
      <ProfileEditInitializer
        currentUser={currentUser}
        setIsLoading={setIsLoading}
      />
      {isLoading && <div>Loading...</div>}{" "}
      {/* Optional: Show loading indicator */}
      <Routes>
        <Route
          path="/*" // Ensure the parent route has a trailing *
          element={
            <>
              <ToolbarWrapper />
              <Content>
                <div className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid">
                  <div className="card d-none d-xl-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9">
                    <div className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid">
                      <div className="card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9">
                        {/* begin::Wrapper*/}
                        <div className="card-body px-3 px-lg-10 py-10 py-lg-10">
                          <div className="d-flex flex-wrap flex-stack justify-content-center mb-5">
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

                          {/* begin::Nav*/}
                          <Link
                            className="stepper-nav"
                            to="/admin/profile-edit/photo"
                          >
                            {/* begin::Step 1*/}
                            <div
                              className={`stepper-item ${
                                location.pathname ===
                                "/admin/profile-edit/photo"
                                  ? "current"
                                  : ""
                              }`}
                              data-kt-stepper-element="nav"
                            >
                              {/* begin::Wrapper*/}
                              <div className="stepper-wrapper">
                                {/* begin::Icon*/}
                                <div className="stepper-icon w-40px h-40px">
                                  <i className="stepper-check fas fa-check"></i>
                                  <span className="stepper-number">1</span>
                                </div>
                                <div className="stepper-label">
                                  <h3
                                    className={`stepper-title ${
                                      location.pathname ===
                                      "/admin/profile-edit/photo"
                                        ? "text-primary fw-bolder"
                                        : "fw-semibold text-muted"
                                    }`}
                                  >
                                    Profile Photo
                                  </h3>

                                  <div className="stepper-desc fw-semibold">
                                    Setup your profile photo and cover
                                  </div>
                                </div>
                                {/* end::Label*/}
                              </div>
                              {/* end::Wrapper*/}

                              {/* begin::Line*/}
                              <div className="stepper-line h-40px"></div>
                              {/* end::Line*/}
                            </div>
                          </Link>
                          {/* end::Step 1*/}

                          {/* begin::Nav*/}
                          <Link
                            className="stepper-nav"
                            to="/admin/profile-edit/bio"
                          >
                            {/* begin::Step 1*/}
                            <div
                              className={`stepper-item ${
                                location.pathname === "/admin/profile-edit/bio"
                                  ? "current"
                                  : ""
                              }`}
                              data-kt-stepper-element="nav"
                            >
                              {/* begin::Wrapper*/}
                              <div className="stepper-wrapper">
                                {/* begin::Icon*/}
                                <div className="stepper-icon w-40px h-40px">
                                  <i className="stepper-check fas fa-check"></i>
                                  <span className="stepper-number">2</span>
                                </div>
                                <div className="stepper-label">
                                  <h3
                                    className={`stepper-title ${
                                      location.pathname ===
                                      "/admin/profile-edit/bio"
                                        ? "text-primary fw-bolder"
                                        : "fw-semibold text-muted"
                                    }`}
                                  >
                                    Biodata
                                  </h3>

                                  <div className="stepper-desc fw-semibold">
                                    Setup your personal information
                                  </div>
                                </div>
                                {/* end::Label*/}
                              </div>
                              {/* end::Wrapper*/}

                              {/* begin::Line*/}
                              <div className="stepper-line h-40px"></div>
                              {/* end::Line*/}
                            </div>
                          </Link>
                          {/* end::Step 1*/}

                          <Link
                            to="/admin/profile-edit/education"
                            className="stepper-nav"
                          >
                            {/* begin::Step 2*/}
                            <div
                              className={`stepper-item ${
                                location.pathname ===
                                "/admin/profile-edit/education"
                                  ? "current"
                                  : ""
                              }`}
                              data-kt-stepper-element="nav"
                            >
                              {/* begin::Wrapper*/}
                              <div className="stepper-wrapper">
                                {/* begin::Icon*/}
                                <div className="stepper-icon w-40px h-40px">
                                  <i className="stepper-check fas fa-check"></i>
                                  <span className="stepper-number">3</span>
                                </div>
                                {/* end::Icon*/}

                                {/* begin::Label*/}
                                <div className="stepper-label">
                                  <h3
                                    className={`stepper-title ${
                                      location.pathname ===
                                      "/admin/profile-edit/education"
                                        ? "text-primary fw-bolder"
                                        : "fw-semibold text-muted"
                                    }`}
                                  >
                                    Education & Training
                                  </h3>

                                  <div className="stepper-desc fw-semibold">
                                    Setup your personal information
                                  </div>
                                </div>
                                {/* end::Label*/}
                              </div>
                              {/* end::Wrapper*/}

                              {/* begin::Line*/}
                              <div className="stepper-line h-40px"></div>
                              {/* end::Line*/}
                            </div>
                          </Link>

                          <Link
                            to="/admin/profile-edit/employment"
                            className="stepper-nav"
                          >
                            {/* begin::Step 3*/}
                            <div
                              className={`stepper-item ${
                                location.pathname ===
                                "/admin/profile-edit/employment"
                                  ? "current"
                                  : ""
                              }`}
                              data-kt-stepper-element="nav"
                            >
                              {/* begin::Wrapper*/}
                              <div className="stepper-wrapper">
                                {/* begin::Icon*/}
                                <div className="stepper-icon w-40px h-40px">
                                  <i className="stepper-check fas fa-check"></i>
                                  <span className="stepper-number">4</span>
                                </div>
                                {/* end::Icon*/}

                                {/* begin::Label*/}
                                <div className="stepper-label">
                                  <h3
                                    className={`stepper-title ${
                                      location.pathname ===
                                      "/admin/profile-edit/employment"
                                        ? "text-primary fw-bolder"
                                        : "fw-semibold text-muted"
                                    }`}
                                  >
                                    Employment
                                  </h3>

                                  <div className="stepper-desc fw-semibold">
                                    Setup your employment history
                                  </div>
                                </div>
                                {/* end::Label*/}
                              </div>
                              {/* end::Wrapper*/}

                              {/* begin::Line*/}
                              <div className="stepper-line h-40px"></div>
                              {/* end::Line*/}
                            </div>
                          </Link>

                          <Link
                            to="/admin/profile-edit/accomplishment"
                            className="stepper-nav"
                          >
                            {/* begin::Step 4*/}
                            <div
                              className={`stepper-item ${
                                location.pathname ===
                                "/admin/profile-edit/accomplishment"
                                  ? "current"
                                  : ""
                              }`}
                              data-kt-stepper-element="nav"
                            >
                              {/* begin::Wrapper*/}
                              <div className="stepper-wrapper">
                                {/* begin::Icon*/}
                                <div className="stepper-icon w-40px h-40px">
                                  <i className="stepper-check fas fa-check"></i>
                                  <span className="stepper-number">5</span>
                                </div>
                                {/* end::Icon*/}

                                {/* begin::Label*/}
                                <div className="stepper-label">
                                  <h3
                                    className={`stepper-title ${
                                      location.pathname ===
                                      "/admin/profile-edit/accomplishment"
                                        ? "text-primary fw-bolder"
                                        : "fw-semibold text-muted"
                                    }`}
                                  >
                                    Accomplishments
                                  </h3>

                                  <div className="stepper-desc fw-semibold">
                                    Setup your accomplishments
                                  </div>
                                </div>
                                {/* end::Label*/}
                              </div>
                            </div>
                          </Link>

                          {/* end::Nav*/}
                        </div>
                        {/* end::Wrapper*/}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-row-fluid flex-s bg-body rounded w-100 w-xl-800px w-xxl-1000px d-flex flex-column card rounded">
                    <Outlet />
                  </div>
                </div>
              </Content>
            </>
          }
        >
          <Route
            path="photo"
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>
                  Profile Photo
                </PageTitle>
                <ProfileEditPhoto />
              </>
            }
          />
          <Route
            path="bio"
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>
                  Personal Information
                </PageTitle>
                <ProfileEditBio />
              </>
            }
          />
          <Route
            path="education"
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>
                  Education
                </PageTitle>
                <ProfileEditEducation />
              </>
            }
          />
          <Route
            path="employment"
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>
                  Employment
                </PageTitle>
                <ProfileEditEmployment />
              </>
            }
          />
          <Route
            path="accomplishment"
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>
                  Accomplishment
                </PageTitle>
                <ProfileEditAccomplishment />
              </>
            }
          />
          {/* Default Route */}
          <Route path="" element={<Navigate to="photo" replace />} />
        </Route>
      </Routes>
    </ProfileEditProvider>
  );
};

// Component to initialize profile state
interface ProfileEditInitializerProps {
  currentUser: any; // Adjust the type based on your actual currentUser structure
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileEditInitializer: React.FC<ProfileEditInitializerProps> = ({
  currentUser,
  setIsLoading,
}) => {
  const { setProfile } = useProfileEdit();

  useEffect(() => {
    const initializeProfile = async () => {
      setIsLoading(true);
      try {
        if (currentUser) {
          // Assuming currentUser contains profile data as a plain object
          const profileData = ProfileModel.fromJson(
            JSON.stringify(currentUser)
          );
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Failed to initialize profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeProfile();
  }, [currentUser, setProfile, setIsLoading]);

  return null; // Or return a loader if needed
};

export default ProfileEditPage;
