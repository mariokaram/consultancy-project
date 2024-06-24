import styles from "@/styles/Project.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/pricing-image.png";
import tick from "~/public/icons/tick.svg";
import redirect from "~/public/icons/redirect.svg";
import ContactBanner from "./Contact-Banner";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import Button from "@mui/material/Button";
import Info from "~/public/icons/info.svg";
import DownloadIcon from "@mui/icons-material/Download";
import arrowRight from "~/public/icons/arrow-right.svg";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import useSWR, { mutate } from "swr";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { toast, ToastContainer } from "react-toastify";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Collapse,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { isEmpty, map, result } from "lodash";
import { ProjectListType } from "../api/dashboard/getProjects";
import moment from "moment";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
import {
  finalDataType,
  IMAGEValueType,
  servicesType,
} from "../api/dashboard/getProjectDetails";
import OpenDialog, { radioIdeaGen } from "./Modal";
import { SpinnerContext } from "@/contexts/SpinnerContextProvider";
import axios from "axios";

interface ProjectDetailsProps {
  projectId: number;
}

export default function ProjectDetails(props: ProjectDetailsProps) {
  const mediaQuery = useMediaQuery("(max-width:1000px)");
  const mediaQuery14 = useMediaQuery("(max-width:1400px)");
  const mediaQuery6 = useMediaQuery("(max-width:600px)");
  const router = useRouter();

  const { data, error, isValidating } = useSWR(
    `/api/dashboard/getProjectDetails?project=${props.projectId}`,
    {
      revalidateOnFocus: false,
    }
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogResult, setDialogResult] = useState("");
  const [serviceId, setServiceId] = useState<number | null>();
  const [ideaPicked, setIdeaPicked] = useState<string>("");
  const services: servicesType[] = data?.result?.services;
  const finalData: finalDataType = data?.result?.finalData;

  const [open, setOpen] = React.useState(false);
  const { showSpinner } = React.useContext(SpinnerContext);
  useEffect(() => {
    const handleAsyncEffect = async () => {
      if (dialogResult === "yes") {
        try {
          const servicesFinalIndex = services.length - 1;

          showSpinner(true);
          const params = {
            serviceId,
            projectId: props.projectId,
            last: services[servicesFinalIndex].serviceId === serviceId,
            ideaPicked,
            type: finalData.projectType,
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
          setServiceId(null);
          setIdeaPicked("");
        }
      }
    };

    handleAsyncEffect();
  }, [dialogResult]);

  async function confirmFile(v: number) {
    setIsDialogOpen(true);
    setServiceId(v);
  }
  async function dialogResultFn(v: string | radioIdeaGen) {
    if (typeof v !== "string") {
      if (v.result.type === "ideaGen") {
        setDialogResult(v.result.answer);
        setIdeaPicked(v.result.radioPicked || "");
      }
    } else {
      setDialogResult(v);
    }

    setIsDialogOpen(false);
  }
  return (
    <>
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
      {!isValidating && !error && !isEmpty(finalData) && !isEmpty(services) && (
        <div>
          <div className={`subTitle`}>
            <div>
              <ArrowBackIosNewIcon
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/dashboard")}
              />{" "}
              {finalData.companyName}
            </div>
          </div>
          <div className={styles.upperBtn}>
            <div style={{ paddingLeft: "2.3rem" }}>
              <div style={{ paddingBottom: "0.5rem" }}>
                Project ID: <strong>{finalData.project_id}</strong>
              </div>
              <div>
                Created on{" "}
                {moment.utc(finalData.date_creation).format("DD-MM-YYYY")}
              </div>
            </div>

            <div>
              {finalData.consultantName && (
                <div style={{ paddingBottom: "0.5rem" }}>
                  Assigned to <strong>{finalData.consultantName}</strong>
                </div>
              )}
              {!finalData.consultantName && (
                <div style={{ paddingBottom: "0.5rem" }}>
                  <small>Consultant not assigned yet</small>{" "}
                </div>
              )}
              <div className={styles.status}>
                <Badge
                  className={finalData.projectColorStatus}
                  variant="dot"
                ></Badge>
                <div>{finalData.projectLabelStatus}</div>
              </div>
            </div>
          </div>
          <div>
            <Collapse in={open}>
              <Alert
                severity="info"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                <AlertTitle>Info</AlertTitle>
                {isNaN(finalData.info as number)
                  ? finalData.info
                  : `Estimatinh time is around ${finalData.info} business days`}
              </Alert>
            </Collapse>
          </div>

          <div className="card">
            <>
              <div className={styles.header}>
                <div className={styles.steps}>
                  <div>Steps</div>
                </div>
                <div className={styles.statu}>
                  <div>Status</div>
                  <div>
                    <Image
                      onClick={() => setOpen(true)}
                      style={{ cursor: "pointer" }}
                      alt="info"
                      src={Info}
                    />
                  </div>
                </div>
                <div className={styles.action}>Actions</div>
              </div>
              {services?.map((v: servicesType, i: number) => (
                <div key={v.serviceName} className={styles.services}>
                  <div className={styles.steps}>
                    {v.serviceName}
                    {i === 0 &&
                      finalData.projectType === "i" &&
                      finalData.ideaPicked && (
                        <>
                          <span>-</span>
                          <span style={{ color: "var(--secondaryColor)" }}>
                            {finalData.ideaPicked}
                          </span>
                        </>
                      )}
                  </div>
                  <div className={styles.statu}>
                    <Badge className={v.status_color} variant="dot"></Badge>
                    <div>{v.status_label}</div>
                  </div>
                  <div className={`${styles.action} ${styles.btnConf} `}>
                    {v.status_value === "NotConfirmed" && !v.confirmed && (
                      <div>
                        <Tooltip placement="top" title={"Confirm"}>
                          <CheckCircleRoundedIcon
                            onClick={() => confirmFile(v.serviceId)}
                            style={{
                              cursor: "pointer",
                              color: "var(--toastify-color-success)",
                            }}
                          />
                        </Tooltip>
                      </div>
                    )}

                    {v.serviceValue?.secure_url && (
                      <div>
                        <a
                          href={v.serviceValue?.secure_url}
                          download={v.serviceValue?.original_filename}
                        >
                          <Button
                            disabled={!v.serviceValue?.secure_url}
                            size="small"
                            className="btn btn-secondary"
                          >
                            Download
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          </div>
          {!finalData.ideaPicked && finalData.projectType === "i" ? (
            <OpenDialog
              title="Choose Idea"
              id="idea"
              type="ideaGen"
              data={finalData}
              text="After you carefully reading the idea generation documnet u have to pick one from these ideas , if you feel not sure can go to chatroom and discuss it with yoyur cobnsultanbt"
              openDialog={isDialogOpen}
              onCloseDialog={(v) => dialogResultFn(v as radioIdeaGen)}
            />
          ) : (
            <OpenDialog
              title="Confirmation"
              id="confirm"
              text="Are you sure you want to confirm , you cannot modify it later on if you submit , if you feel not sure you can go to chatroom and discuss it with your consultant"
              openDialog={isDialogOpen}
              onCloseDialog={(v) => dialogResultFn(v as string)}
            />
          )}
        </div>
      )}

      {isValidating && (
        <div className={styles.loading}>
          <CircularProgress
            style={{ color: "var(--secondaryColor)" }}
            size={50}
          ></CircularProgress>
        </div>
      )}
      {error && (
        <div>
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle>Something went wrong</AlertTitle>
            Try reloading this page , or contact customer service if this issue
            persists!
          </Alert>
        </div>
      )}
    </>
  );
}
