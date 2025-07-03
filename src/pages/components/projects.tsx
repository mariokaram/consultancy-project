import styles from "@/styles/Project.module.scss";
import Image from "next/image";
import Button from "@mui/material/Button";
import useSWR, { mutate } from "swr";
import { toast, ToastContainer } from "react-toastify";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import DownloadIcon from "@mui/icons-material/Download";
import {
  finalDataType,
  servicesType,
} from "../api/dashboard/getProjectDetails";
import OpenDialog from "./Modal";
import { SpinnerContext } from "@/contexts/SpinnerContextProvider";
import axios from "axios";
import SquareComponent from "@/pages/components/Square-component";
import ProjectInfoComponent from "@/pages/components/Project-Info-component";
import StarIcon from "@mui/icons-material/Star";
import ideaGenBanner from "~/public/imgs/ideaGenBanner.png";
import { useRouter } from "next/router";
interface ProjectDetailsProps {
  projectId: number;
  userRole: string;
}
interface serviceIdObjectType {
  serviceId: number | null;
  orderId: number | null;
  serviceName: string | null;
}

export default function ProjectDetails(props: ProjectDetailsProps) {
  const { data, error, isValidating } = useSWR(
    `/api/dashboard/getProjectDetails?project=${props.projectId}`,
    {
      revalidateOnFocus: false,
    }
  );
  const [openDialogType, setOpenDialogType] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogResult, setDialogResult] = useState("");
  const [serviceObject, setServiceId] = useState<serviceIdObjectType>({
    serviceId: null,
    orderId: null,
    serviceName: null,
  });
  const services: servicesType[] = data?.result?.services;
  const finalData: finalDataType = data?.result?.finalData;
  const router = useRouter();
  const { showSpinner } = React.useContext(SpinnerContext);
  useEffect(() => {
    const handleAsyncEffect = async () => {
      if (dialogResult === "yes") {
        try {
          const servicesFinalIndex = services.length - 1;

          showSpinner(true);
          const params = {
            serviceId: serviceObject?.serviceId,
            projectId: props.projectId,
            last:
              services[servicesFinalIndex].serviceId ===
              serviceObject?.serviceId,
            serviceOrderId: serviceObject?.orderId,
          };
          const response = await axios.put(
            "/api/dashboard/confirmFile",
            params
          );

          if (response.data.success) {
            showSpinner(false);
            toast.success("Confirmed succussfully!");
            mutate(
              `/api/dashboard/getProjectDetails?project=${props.projectId}`
            );
          } else {
            showSpinner(false);
            toast.error("Sorry, something went wrong!");
          }
        } catch (error) {
          showSpinner(false);
          toast.error("Sorry, something went wrong!");
        } finally {
          setDialogResult("no");
          setServiceId({ serviceId: null, orderId: null, serviceName: null });
        }
      }

      if (dialogResult === "yesIdeaGen") {
        try {
          showSpinner(true);
          const params = {
            serviceId: serviceObject?.serviceId,
            projectId: props.projectId,
          };
          const response = await axios.put(
            "/api/dashboard/confirmIdeaPicking",
            params
          );

          if (response.data.success) {
            showSpinner(false);
            toast.success("Idea picked succussfully!");
            mutate(
              `/api/dashboard/getProjectDetails?project=${props.projectId}`
            );
          } else {
            showSpinner(false);
            toast.error("Sorry, something went wrong!");
          }
        } catch (error) {
          showSpinner(false);
          toast.error("Sorry, something went wrong!");
        } finally {
          setDialogResult("no");
          setServiceId({ serviceId: null, orderId: null, serviceName: null });
        }
      }
      if (dialogResult === "okey") {
        setDialogResult("no");
        setServiceId({ serviceId: null, orderId: null, serviceName: null });
      }
    };

    handleAsyncEffect();
  }, [dialogResult]);

  async function confirmFile(
    serviceId: number,
    order: number,
    serviceName: string,
    dialogType: string
  ) {
    if (finalData.projectStatusValue === "complete") {
      router.push({
        pathname: "/pricing",
        query: {
          upgradeProjectType: finalData.projectType,
          projectId: finalData.project_id,
          originalProjectId: finalData.upgradeFromProjectId
            ? finalData.upgradeFromProjectId
            : finalData.project_id,
          originalProjectType: finalData.upgradeFromProjectType
            ? finalData.upgradeFromProjectType
            : finalData.projectType,
        },
      });
      return;
    }

    setOpenDialogType(dialogType);
    setIsDialogOpen(true);
    setServiceId({
      serviceId: serviceId,
      orderId: order,
      serviceName: serviceName,
    });
  }
  async function dialogResultFn(v: string) {
    setDialogResult(v);
    setIsDialogOpen(false);
    setOpenDialogType(null);
  }

  function renderStatus(finalData: finalDataType, v: servicesType) {
    if (
      finalData.projectType === "i" &&
      v.status_value === "complete" &&
      v.serviceOrder !== 3
    ) {
      return v.confirmed ? (
        <div className={styles.picked}>
          <div>
            <StarIcon />
          </div>
          <div>Picked</div>
        </div>
      ) : (
        ""
      );
    }
    return <div className={v.status_color}>{v.status_label}</div>;
  }

  return (
    <>
      {isValidating && (
        <div className={styles.loading}>
          <CircularProgress
            style={{ color: "var(--blueColor)" }}
            size={50}
          ></CircularProgress>
        </div>
      )}
      <div className={styles.projectContainer}>
        <div className={styles.content}>
          {!isValidating &&
            !error &&
            !isEmpty(finalData) &&
            !isEmpty(services) && (
              <>
                <ProjectInfoComponent
                  project_id={finalData.project_id}
                  status_value={finalData.projectStatusValue}
                  companyName={finalData.companyName}
                  projectTypeName={finalData.projectTypeName}
                  date_creation={finalData.date_creation}
                  status_color={finalData.projectColorStatus}
                  status_label={finalData.projectLabelStatus}
                  originalProjectId={finalData.upgradeFromProjectId}
                  info={finalData.info}
                  paymentLink={finalData.paymentLink}
                  currentServiceName={
                    finalData.projectType !== "i" ||
                    (finalData.projectType === "i" &&
                      services[0]?.status_value === "complete")
                      ? finalData.currentServiceName
                      : ""
                  }
                  userRole={props.userRole}
                  invoice={finalData.invoice}
                  consultantName={finalData.consultantName}
                  comingFrom="details"
                />
                <div className={styles.stepsContainer}>
                  <>
                    {services?.map((v: servicesType, i: number) => (
                      <div key={v.serviceName}>
                        <div className={styles.services}>
                          <div
                            className={`${styles.serviceImgContainer} ${
                              i === services.length - 1
                                ? styles.lastService
                                : ""
                            }`}
                          >
                            <span className={styles.number}>{i + 1}</span>
                          </div>
                          <div className={styles.serviceSection}>
                            <div className={styles.serviceName}>
                              {v.serviceName}
                            </div>
                            <div className={styles.status}>
                              {renderStatus(finalData, v)}
                            </div>
                          </div>

                          <div className={`${styles.action}`}>
                            <div>
                              {v.serviceValue?.secure_url && (
                                <>
                                  <div className={styles.download}>
                                    <Button
                                      className="btn btn-whitish"
                                      size="large"
                                    >
                                      <a
                                        href={v.serviceValue?.secure_url}
                                        download={
                                          v.serviceValue?.original_filename
                                        }
                                        style={{
                                          textDecoration: "none",
                                          color: "inherit",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <DownloadIcon
                                          style={{ marginRight: ".3rem" }}
                                        />
                                        Download File
                                      </a>
                                    </Button>
                                  </div>
                                </>
                              )}
                            </div>
                            {v.status_value === "NotConfirmed" &&
                              !v.confirmed && (
                                <div>
                                  <Button
                                    size="large"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                      confirmFile(
                                        v.serviceId,
                                        v.serviceOrder,
                                        v.serviceName,
                                        finalData.projectType === "i" &&
                                          (i === 0 || i === 1)
                                          ? `ideagen`
                                          : "confirm"
                                      )
                                    }
                                  >
                                    {finalData.projectType === "i" &&
                                    (i === 0 || i === 1)
                                      ? `choose idea ${i + 1}`
                                      : "confirm"}
                                  </Button>
                                </div>
                              )}
                          </div>
                        </div>
                        {i !== services.length - 1 && (
                          <hr className={styles.horizontal} />
                        )}
                      </div>
                    ))}
                  </>
                </div>
                {!finalData.project_upgraded &&
                  finalData.projectUpgradeCount < 2 &&
                  finalData.projectType !== "b" &&
                  finalData.projectType !== "bc" && (
                    <div className={styles.contactSection}>
                      <Image
                        quality={100}
                        src={ideaGenBanner}
                        alt="contactus"
                      />
                      <div className={styles.contentBanner}>
                        <h2 className={`subTitle ${styles.subTitle} `}>
                          {finalData.projectType == "i"
                            ? "Turn your idea into a business"
                            : "Upgrade your Project!"}
                        </h2>
                        <div className={`description ${styles.desc}`}>
                          Take full advantage of our bundles by upgrading to one
                          once this project is complete. We will send you a
                          quotation with a discounted price as part of the
                          upgrade.
                        </div>
                        <div className={styles.btn}>
                          <Button
                            size="large"
                            onClick={() => confirmFile(0, 0, "", "alert")}
                            className="btn btn-white"
                          >
                            Upgrade plan
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                {openDialogType === "ideagen" && (
                  <OpenDialog
                    title="Select your Preferred Idea"
                    btnName="Choose"
                    id="ideagen"
                    type="ideagen"
                    text={`${serviceObject.serviceName}`}
                    openDialog={isDialogOpen}
                    onCloseDialog={(v) => dialogResultFn(v as string)}
                  />
                )}

                {openDialogType === "alert" && (
                  <OpenDialog
                    btnName="Close"
                    title="Upgrading your project"
                    type="alert"
                    id="alert"
                    text="To upgrade this project, you must first complete the process of the bundle you are currently in."
                    openDialog={isDialogOpen}
                    onCloseDialog={(v) => dialogResultFn(v as string)}
                  />
                )}

                {openDialogType === "confirm" && (
                  <OpenDialog
                    btnName="Confirm"
                    title="Confirmation"
                    id="confirm"
                    text="Are you sure you want to confirm? Once confirmed, changes cannot be made. If you have any concerns, feel free to discuss them with your consultant in the chatroom before proceeding."
                    openDialog={isDialogOpen}
                    onCloseDialog={(v) => dialogResultFn(v as string)}
                  />
                )}
              </>
            )}
          {error && (
            <div>
              <Alert severity="error" sx={{ mt: 2 }}>
                <AlertTitle>Something went wrong</AlertTitle>
                Try reloading this page , or contact customer service if this
                issue persists!
              </Alert>
            </div>
          )}
        </div>
        {(!isValidating || error) && (
          <SquareComponent
            isPaid={finalData.invoice ? true : false}
            projectId={props.projectId}
            chatroom={error ? 0 : 1}
            customer={2}
          />
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
}
