import { FC, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import { PageTitle } from "../../../_metronic/layout/core";
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
} from "../../../_metronic/partials/widgets";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { JobSeekerManifest } from "../../models/JobSeekerManifest";
import { toast } from "react-toastify";
import clsx from "clsx";
import { getCSSVariableValue } from "../../../_metronic/assets/ts/_utils";
import { Link } from "react-router-dom";

const initChart = function (
  chartSize: number = 70,
  chartLine: number = 11,
  chartRotate: number = 145
) {
  const el = document.getElementById("kt_card_widget_17_chart");
  if (!el) {
    return;
  }
  el.innerHTML = "";

  const options = {
    size: chartSize,
    lineWidth: chartLine,
    rotate: chartRotate,
    //percent:  el.getAttribute('data-kt-percent') ,
  };

  const canvas = document.createElement("canvas");
  const span = document.createElement("span");

  //@ts-ignore
  if (typeof G_vmlCanvasManager !== "undefined") {
    //@ts-ignore
    G_vmlCanvasManager.initElement(canvas);
  }

  const ctx = canvas.getContext("2d");
  canvas.width = canvas.height = options.size;

  el.appendChild(span);
  el.appendChild(canvas);

  ctx?.translate(options.size / 2, options.size / 2); // change center
  ctx?.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

  //imd = ctx.getImageData(0, 0, 240, 240);
  const radius = (options.size - options.lineWidth) / 2;

  const drawCircle = function (
    color: string,
    lineWidth: number,
    percent: number
  ) {
    percent = Math.min(Math.max(0, percent || 1), 1);
    if (!ctx) {
      return;
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = color;
    ctx.lineCap = "round"; // butt, round or square
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  // Init 2
  drawCircle("#E4E6EF", options.lineWidth, 100 / 100);
  drawCircle(getCSSVariableValue("--bs-primary"), options.lineWidth, 100 / 150);
  drawCircle(getCSSVariableValue("--bs-success"), options.lineWidth, 100 / 250);
};

const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userManifest, setUserManifest] = useState(new JobSeekerManifest());
  const chartRef = useRef<HTMLDivElement | null>(null);
  const myInit = async () => {
    initChart(70, 11, 10);
    var userMan = null;
    try {
      userMan = await JobSeekerManifest.getItems();
    } catch (error) {
      toast.error("Failed to fetch user manifest because: " + error);
      return;
    }
    setUserManifest(userMan);
  };
  useEffect(() => {
    myInit();
  }, []);
  return (
    <>
      {/* <ToolbarWrapper /> */}
      <Content>
        {/*    <button className="btn btn-primary" onClick={() => myInit()}>
          Test
        </button> */}
        {/* begin::Row */}
        <div
          className="row g-5 g-xl-10 mb-5 mb-xl-10 "
          style={{ marginTop: "0px" }}
        >
          {/* begin::Col */}
          <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
            <div
              className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-md-50 mb-5 mb-xl-10 `}
              style={{
                backgroundColor: "#F43E03",
                backgroundImage: `url('${toAbsoluteUrl(
                  "media/patterns/vector-1.png"
                )}')`,
              }}
            >
              <div className="card-header pt-5">
                <div className="card-title d-flex flex-column">
                  <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">
                    {userManifest.cv_views}
                  </span>

                  <span className="text-white  pt-1 fw-semibold fs-6">
                    Profile Views
                  </span>
                </div>
              </div>
              <div className="card-body d-flex align-items-end pt-0">
                <div className="d-flex align-items-center flex-column mt-3 w-100">
                  <div className="d-flex justify-content-between fw-bold fs-6 text-white opacity-100 w-100 mt-auto mb-2">
                    <span>Profile Completion</span>
                    <span>{userManifest.profile_completion_percentage}%</span>
                  </div>

                  <div className="h-8px mx-3 w-100 bg-white bg-opacity-50 rounded">
                    <div
                      className="bg-white rounded h-8px"
                      role="progressbar"
                      style={{
                        width: `${userManifest.profile_completion_percentage}%`,
                      }}
                      aria-valuenow={userManifest.profile_completion_percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`card card-flush h-md-50 mb-5 mb-xl-10`}>
              <div className="card-header pt-5">
                <div className="card-title d-flex flex-column">
                  <div className="card-title d-flex flex-column">
                    <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">
                      730
                    </span>
                    <span className="text-gray-500 pt-1 fw-semibold fs-6">
                      Professionals
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-body d-flex flex-column justify-content-end pe-0">
                <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">
                  Today's Heroes
                </span>
                <div className="symbol-group symbol-hover flex-nowrap">
                  <div
                    className="symbol symbol-35px symbol-circle"
                    data-bs-toggle="tooltip"
                    title="{item.name}"
                    key={`cw7-item-1`}
                  >
                    <span
                      className={clsx(
                        "symbol-label fw-bold",
                        "bg-success",
                        "text-inverse-danger"
                      )}
                    >
                      asa``
                    </span>
                  </div>
                  <a href="#" className="symbol symbol-35px symbol-circle">
                    <span
                      className={clsx(
                        "symbol-label fs-8 fw-bold",
                        "bg-dark",
                        "text-gray-300"
                      )}
                    >
                      +42
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* end::Col */}

          {/* begin::Col */}
          <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
            <div className={`card card-flush h-md-50 mb-5 mb-xl-10`}>
              <div className="card-header pt-5">
                <div className="card-title d-flex flex-column">
                  <div className="d-flex align-items-center">
                    {/*  <span className="fs-4 fw-semibold text-gray-500 me-1 align-self-start">
                      $
                    </span> */}

                    <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">
                      {userManifest.job_application_count}
                    </span>

                    <span className="badge badge-light-primary fs-base">
                      <KTIcon
                        iconName="briefcase"
                        className="fs-5 text-primary ms-n1"
                      />{" "}
                      Jobs Applied
                    </span>
                  </div>
                  <span className="text-gray-500 pt-1 fw-semibold fs-6">
                    Job Application Breakdown
                  </span>
                </div>
              </div>

              <div className="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
                <div className="d-flex flex-center me-5 pt-2">
                  <div
                    id="kt_card_widget_17_chart"
                    ref={chartRef}
                    style={{ minWidth: 70 + "px", minHeight: 70 + "px" }}
                    data-kt-size={70}
                    data-kt-line={11}
                  ></div>
                </div>

                <div className="d-flex flex-column content-justify-center flex-row-fluid">
                  <div className="d-flex fw-semibold align-items-center mb-2">
                    <div
                      className="bullet w-8px h-3px rounded-2 me-3 "
                      style={{ backgroundColor: "#E4E6EF" }}
                    ></div>
                    <div className="text-gray-500 flex-grow-1 me-4">
                      Pending
                    </div>
                    <div className=" fw-bolder text-gray-700 text-xxl-end">
                      {userManifest.job_application_pending}
                    </div>
                  </div>
                  <div className="d-flex fw-semibold align-items-center">
                    <div className="bullet w-8px h-3px rounded-2 bg-success me-3"></div>
                    <div className="text-gray-500 flex-grow-1 me-4">
                      Successful
                    </div>
                    <div className="fw-bolder text-gray-700 text-xxl-end">
                      {userManifest.job_application_accepted}
                    </div>
                  </div>
                  <div className="d-flex fw-semibold align-items-center my-3">
                    <div className="bullet w-8px h-3px rounded-2 bg-primary me-3"></div>
                    <div className="text-gray-500 flex-grow-1 me-4">
                      Declined
                    </div>
                    <div className="fw-bolder text-gray-700 text-xxl-end">
                      {userManifest.job_application_rejected}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ListsWidget26 className="h-lg-50" />
          </div>
          {/* end::Col */}

          {/* begin::Col */}
          <div className="col-xxl-6">
            <EngageWidget10 className="h-md-100" />
          </div>
          {/* end::Col */}
        </div>
        {/* end::Row */}

        {/* begin::Row */}
        <div className="row gx-5 gx-xl-10">
          {/* begin::Col */}
          <div className="col-xxl-6 mb-5 mb-xl-10">
            {/* <app-new-charts-widget8 cssclassName="h-xl-100" chartHeight="275px" [chartHeightNumber]="275"></app-new-charts-widget8> */}
          </div>
          {/* end::Col */}

          {/* begin::Col */}
          <div className="col-xxl-6 mb-5 mb-xl-10">
            {/* <app-cards-widget18 cssclassName="h-xl-100" image="./assetsmedia/stock/600x600/img-65.jpg"></app-cards-widget18> */}
          </div>
          {/* end::Col */}
        </div>
        {/* end::Row */}

        {/* begin::Row */}
        <div className="row gy-5 gx-xl-8">
          <div className="col-xxl-4">
            <div className={`card card-xxl-stretch mb-xl-3`}>
              {/* begin::Header */}
              <div className="card-header border-0">
                <h3 className="card-title fw-bold text-gray-900">
                  My jobs offers
                </h3>
                <div className="card-toolbar">
                  <Link
                    className="btn btn-sm btn-light-primary"
                    to={"/admin/my-job-offers"}
                  >
                    View All
                  </Link>
                </div>
              </div>
              {/* end::Header */}
              {/* begin::Body */}
              <div className="card-body pt-2">
                {userManifest.job_offers?.length ? (
                  userManifest.job_offers.map((offer) => {
                    const getClasses = () => {
                      switch (offer.status) {
                        case "Pending":
                          return {
                            bullet: "bg-warning",
                            badge: "badge-light-warning",
                          };
                        case "Declined":
                          return {
                            bullet: "bg-danger",
                            badge: "badge-light-danger",
                          };
                        case "Accepted":
                          return {
                            bullet: "bg-success",
                            badge: "badge-light-success",
                          };
                        default:
                          return {
                            bullet: "bg-secondary",
                            badge: "badge-light-secondary",
                          };
                      }
                    };
                    const { bullet, badge } = getClasses();
                    return (
                      <div
                        className="d-flex align-items-center mb-8"
                        key={offer.id}
                      >
                        <span
                          className={`bullet bullet-vertical h-40px ${bullet}`}
                        ></span>
                        <div className="form-check form-check-custom form-check-solid mx-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <a
                            href="#"
                            className="text-gray-800 text-hover-primary fw-bold fs-6"
                          >
                            {offer.job_title}
                          </a>
                          <span className="text-muted fw-semibold d-block">
                            {offer.company_name} - {offer.start_date}
                          </span>
                        </div>
                        <span className={`badge fs-8 fw-bold ${badge}`}>
                          {offer.status}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="d-flex flex-column align-items-center text-center">
                    <i className="bi bi-briefcase fs-1 text-muted mb-3"></i>
                    <span className="text-muted fw-semibold">
                      No recent job offers
                    </span>
                  </div>
                )}
              </div>
              {/* end::Body */}
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card card-xxl-stretch mb-5 mb-xl-8">
              <div className="card-header border-0 pt-5 d-flex justify-content-between">
                <h3 className="card-title flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">
                    Job Applications
                  </span>
                  <span className="text-muted mt-1 fw-semibold fs-7">
                    {userManifest.job_applications?.length
                      ? `Over ${userManifest.job_applications.length} Applications`
                      : "No applications found"}
                  </span>
                </h3>
                <div className="card-toolbar">
                  <Link
                    to="/admin/my-job-applications"
                    className="btn btn-sm btn-light-primary"
                  >
                    <KTIcon iconName="eye" className="fs-3" />
                    View All
                  </Link>
                </div>
              </div>
              <div className="card-body py-3">
                {userManifest.job_applications?.length ? (
                  <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                      <thead>
                        <tr className="fw-bold text-muted">
                          <th className="min-w-100px">Date</th>
                          <th className="min-w-120px">Job Title</th>
                          <th className="min-w-100px">Company</th>
                          <th className="min-w-100px">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userManifest.job_applications.map((app) => {
                          const getStatusClass = (status: string) => {
                            switch (status) {
                              case "Accepted":
                                return "badge-light-success";
                              case "Rejected":
                                return "badge-light-danger";
                              case "Pending":
                                return "badge-light-warning";
                              default:
                                return "badge-light-info";
                            }
                          };
                          return (
                            <tr key={app.id}>
                              <td>
                                <span className="text-gray-900 fs-7">
                                  {new Date(app.created_at).toLocaleString()}
                                </span>
                              </td>
                              <td>
                                <span className="text-gray-900 fw-bold fs-6">
                                  {app.job_text}
                                </span>
                              </td>
                              <td>
                                <span className="text-gray-900 fw-bold fs-6">
                                  {app.employer_text}
                                </span>
                              </td>

                              <td>
                                <span
                                  className={
                                    "badge fs-8 fw-bold " +
                                    getStatusClass(app.status)
                                  }
                                >
                                  {app.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-center text-center">
                    <i className="bi bi-briefcase fs-1 text-muted mb-3"></i>
                    <span className="text-muted fw-semibold">
                      No job applications available
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* end::Row */}
      </Content>
    </>
  );
};

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
