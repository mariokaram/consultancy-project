import styles from "@/styles/ProjectConsultant.module.scss";
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
import CheckIcon from "@mui/icons-material/Check";
import useSWR, { mutate } from "swr";
import OpenDialog, { InfoEmailAlertValueType } from "@/pages/components/Modal";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import {
  Alert,
  AlertTitle,
  CircularProgress,
  Collapse,
  IconButton,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
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
  servicesType,
} from "@/pages/api/consultant/getProjectsDetails-consultant";
import { UsersConsultantType } from "../api/consultant/getProjectsDetails-consultant";
import axios from "axios";
import { SpinnerContext } from "@/contexts/SpinnerContextProvider";
import { toast, ToastContainer } from "react-toastify";
import ImageUpload from "./ImageUpload";

import { configs } from "@/utils/config";
import { insertLogs } from "@/utils/shared";

interface ProjectDetailsProps {
  projectId: number;
  userRole: string;
}
interface DashType {
  assignedConsultant: string;
}
interface DialogModal {
  [key: string]: {
    isOpen: boolean;
    text?: string;
    type: string;
    title: string;
    id: string;
  };
}
interface DurationType {
  [key: string]: {
    duration: number;
  };
}

export default function ProjectConsultantDetails(props: ProjectDetailsProps) {
  const mediaQuery = useMediaQuery("(max-width:1000px)");
  const mediaQuery14 = useMediaQuery("(max-width:1400px)");
  const mediaQuery6 = useMediaQuery("(max-width:600px)");
  const router = useRouter();
  const { showSpinner } = React.useContext(SpinnerContext);
  const { data, error, isValidating } = useSWR(
    `/api/consultant/getProjectsDetails-consultant?project=${props.projectId}`,
    {
      revalidateOnFocus: false,
    }
  );

  const services: servicesType[] = data?.result?.services;
  const finalData: finalDataType = data?.result?.finalData;
  const usersInfo: UsersConsultantType[] = data?.result?.usersInfo;
  const [open, setOpen] = useState(false);

  const [durationInputs, setDuration] = useState<DurationType>();

  const [dashValue, setDash] = useState<DashType>({
    assignedConsultant: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState<DialogModal>({
    readyToPay: {
      isOpen: false,
      title: "Questionnaire reviewed successfully alert",
      type: "inputEmailAlert",
      id: "readyToPay",
    },
    changeOfPlan: {
      isOpen: false,
      type: "inputEmailAlert",
      title: "Plan modification alert",
      id: "changeOfPlan",
    },
  });
  const [dialogResult, setDialogResult] = useState<InfoEmailAlertValueType>();
  const [modalName, setModalName] = useState<string>("");

  async function getSignature(id: number, name: string): Promise<any> {
    try {
      const params = {
        folderName: "services",
        subFolder: name,
        id,
      };

      const response = await axios.get("/api/cloudinary/getSignature", {
        params,
      });

      if (response.data.success) {
        const { signature, timestamp } = response.data.result;
        return { signature, timestamp };
      } else {
        showSpinner(false);
      }
    } catch (error) {
      showSpinner(false);
    }
  }

  useEffect(() => {
    if (finalData) {
      setDash((state) => ({
        ...state,
        assignedConsultant: finalData.consultantId || "",
      }));

      if (services) {
        services.map((v) => {
          setDuration((curr) => ({
            ...curr,
            [v.serviceId]: {
              duration: v.serviceDuration || "",
            },
          }));
        });
      }
    }
  }, [finalData, services]);

  async function handleModalFunction(v: InfoEmailAlertValueType) {
    try {
      showSpinner(true);
      switch (v.result.type) {
        case "inputEmailAlert":
          const params = {
            to: finalData.userEmail,
            content: v.result.emailValue,
            type: v.modalName,
            alertValue: v.result.alertValue,
            projectId: props.projectId,
          };

          const res = await axios.put(
            "/api/consultant/admin/alertUser",
            params
          );
          if (res.data.success) {
            mutate(RefetchUrl);
            showSpinner(false);
          } else {
            showSpinner(false);
            toast.error("Sorry, something went wrong!");
          }
          break;

        default:
          showSpinner(false);
          return null;
      }
    } catch (error) {
      toast.error("Sorry, something went wrong!");
      showSpinner(false);
    }
  }

  useEffect(() => {
    const handleModalResult = async () => {
      if (dialogResult?.result.answer === "yes" && isDialogOpen[modalName]) {
        handleModalFunction(dialogResult);
        setModalName("");
      }
    };

    handleModalResult();
  }, [dialogResult?.result]);

  const RefetchUrl = `/api/consultant/getProjectsDetails-consultant?project=${finalData?.project_id}`;

  async function submitAssignee() {
    try {
      showSpinner(true);
      const params = {
        consultantId: dashValue.assignedConsultant,
        projectId: finalData.project_id,
      };
      const res = await axios.put(
        "/api/consultant/admin/assignConsultant",
        params
      );
      if (res.data.success) {
        mutate(RefetchUrl);
        showSpinner(false);
      } else {
        showSpinner(false);
      }
    } catch (error) {
      showSpinner(false);
    }
  }

  function dialogResultFn(v: InfoEmailAlertValueType) {
    setDialogResult(v);
    setIsDialogOpen((state: DialogModal) => ({
      ...state,
      [v.modalName]: { ...state[v.modalName], isOpen: false },
    }));
  }

  function openModal(v: string) {
    setModalName(v);
    setIsDialogOpen((state: DialogModal) => ({
      ...state,
      [v]: { ...state[v], isOpen: true },
    }));
  }

  const retrunImage = (id: number) => async (v: File) => {
    try {
      showSpinner(true);

      const url: string = `${configs.cloudinary_url}`;
      const { signature, timestamp } = await getSignature(id, v.name);
      const formData = new FormData();
      formData.append("file", v);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("folder", `services/${id}/${v.name}`);
      formData.append("use_filename", "true");
      formData.append("overwrite", "true");
      formData.append("transformation", "fl_attachment");
      formData.append("api_key", `${configs.cloudinary_api_key}`);

      const response = await fetch(url, {
        method: "post",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        toast.error("Sorry, something went wrong!");
        insertLogs(
          "client",
          "formData",
          "project-consultant",
          data.error?.message
        );
      } else {
        const params = {
          imageInfo: {
            public_id: data.public_id,
            secure_url: data.secure_url,
            original_filename: data.original_filename,
          },
          serviceId: id,
          userEmail: finalData.userEmail,
          projectId: props.projectId,
        };

        const res = await axios.put("/api/consultant/addServiceImage", params);

        if (res.data.success) {
          toast.success("Uploaded successfully!");
        } else {
          toast.error("Sorry, something went wrong!");
        }
      }
    } catch (error: any) {
      toast.error("Sorry, something went wrong!");
      insertLogs("client", "formData", "project-consultant", error?.message);
    } finally {
      mutate(RefetchUrl);
      showSpinner(false);
    }
  };

  async function confirmDuration(v: number) {
    try {
      if (durationInputs && !durationInputs[v]?.duration) {
        return null;
      }
      showSpinner(true);

      const params = {
        serviceId: v,
        duration:
          durationInputs && durationInputs[v]?.duration
            ? durationInputs[v]?.duration
            : "",
      };

      const res = await axios.put(
        "/api/consultant/admin/addDurationInfo",
        params
      );
      if (res.data.success) {
        showSpinner(false);
        toast.success("Duration added succussfully!");
      } else {
        showSpinner(false);
        toast.error("Sorry, something went wrong!");
      }
    } catch (error) {
      toast.error("Sorry, something went wrong!");
      showSpinner(false);
    }
  }

  const removeImage = (imageInfo: any, serviceId: number) => async () => {
    try {
      showSpinner(true);
      let params: any;
      params = { id: imageInfo.public_id };
      const res = await axios.get("/api/cloudinary/cloudinaryDelete", {
        params,
      });
      if (res.data.success) {
        params = {
          serviceId,
          isDelete: true,
          userEmail: finalData.userEmail,
          projectId: props.projectId,
        };
        const resDeleteApi = await axios.put(
          "/api/consultant/addServiceImage",
          params
        );
        if (resDeleteApi.data.success) {
          toast.success("Deleted successfully!");
        } else {
          throw {
            message: "delete imageValue on addServiceImage",
          };
        }
      } else {
        throw {
          message: "delete imageValue on cloudinary",
        };
      }
    } catch (error: any) {
      insertLogs("client", "removeImage", "project-consultant", error?.message);
      toast.error("Sorry, something went wrong!");
    } finally {
      mutate(RefetchUrl);
      showSpinner(false);
    }
  };

  return (
    <>
      {!isValidating && !error && !isEmpty(finalData) && !isEmpty(services) && (
        <div>
          <div className={`subTitle`}>
            <div>
              <ArrowBackIosNewIcon
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/consultant/dashboard-consultant")}
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

          {props.userRole === "a" && (
            <div className={styles.adminDash}>
              <div className="card">
                <div className={styles.stepsAdmin}>
                  <label className={styles.left}>
                    <strong>Admin steps</strong>
                  </label>
                  <div className={styles.right}></div>
                  <div className={styles.btnss}>
                    <div>
                      <strong>Actions</strong>
                    </div>
                  </div>
                </div>
                <div className={styles.stepsAdmin}>
                  <label className={styles.left}>Prepare a quotation</label>
                  <div className={styles.right}></div>
                  <div className={styles.btnss}>
                    <Button disabled className={`links `}>
                      quotation
                    </Button>
                  </div>
                </div>
                <div className={styles.stepsAdmin}>
                  <label className={styles.left}>
                    Questionnaire review is done and ready to pay
                  </label>
                  <div className={styles.right}></div>
                  <div className={styles.btnss}>
                    <Button
                      onClick={() => openModal("readyToPay")}
                      className={`links `}
                    >
                      Ready to pay
                    </Button>
                  </div>
                </div>
                <div className={styles.stepsAdmin}>
                  <label className={styles.left}>Change to complex Plan</label>
                  <div className={styles.right}></div>
                  <div className={styles.btnss}>
                    <Button
                      onClick={() => openModal("changeOfPlan")}
                      className={`links `}
                    >
                      Change
                    </Button>
                  </div>
                </div>
                <div className={styles.stepsAdmin}>
                  <label className={styles.left}>Assign this project to</label>
                  <Select
                    className={`${styles.right} textInput selectInput`}
                    value={dashValue.assignedConsultant}
                    onChange={(e: SelectChangeEvent) =>
                      setDash((state) => ({
                        ...state,
                        assignedConsultant: e.target.value,
                      }))
                    }
                  >
                    <MenuItem key={"none"} value={""}>
                      Not Assigned
                    </MenuItem>
                    {map(usersInfo, (v: UsersConsultantType) => (
                      <MenuItem key={v.id} value={v.id}>
                        {v.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div className={styles.btnss}>
                    <Button
                      onClick={() => submitAssignee()}
                      className={`links `}
                    >
                      Assign
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                {props.userRole === "a" && (
                  <div className={styles.duration}>Duration (days)</div>
                )}
                <div className={styles.action}>Actions</div>
              </div>
              {services?.map((v: servicesType) => (
                <div key={v.serviceName} className={styles.services}>
                  <div className={styles.steps}>{v.serviceName}</div>
                  <div className={styles.statu}>
                    <Badge className={v.status_color} variant="dot"></Badge>
                    <div>{v.status_label}</div>
                  </div>
                  {props.userRole === "a" && (
                    <div className={styles.duration}>
                      <Input
                        style={{ width: "80px" }}
                        className="textInput"
                        type="number"
                        value={
                          (durationInputs &&
                            durationInputs[v.serviceId]?.duration) ||
                          ""
                        }
                        onChange={(e) =>
                          setDuration((curr) => ({
                            ...curr,
                            [v.serviceId]: { duration: e.target.value },
                          }))
                        }
                      />
                      <CheckCircleRoundedIcon
                        onClick={() => confirmDuration(v.serviceId)}
                        style={{
                          marginLeft: ".2rem",
                          cursor: "pointer",
                          color: "var(--toastify-color-success)",
                        }}
                      />
                    </div>
                  )}
                  <div className={styles.action}>
                    {props.userRole === "c" && v.serviceValue?.secure_url && (
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
                    )}

                    {props.userRole === "a" && (
                      <div>
                        <ImageUpload
                          returnFunction={retrunImage(v.serviceId)}
                          removeFunction={removeImage(
                            v.serviceValue,
                            v.serviceId
                          )}
                          disableRemove={false}
                          imageValue={v.serviceValue || undefined}
                          onError={false}
                          fromConsultant={true}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
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
      <OpenDialog
        title={isDialogOpen[modalName]?.title}
        id={isDialogOpen[modalName]?.id}
        type={isDialogOpen[modalName]?.type}
        openDialog={isDialogOpen[modalName]?.isOpen || false}
        onCloseDialog={(v) => dialogResultFn(v as InfoEmailAlertValueType)}
      />
    </>
  );
}
