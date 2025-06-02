import styles from "@/styles/ProjectConsultant.module.scss";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import useSWR, { mutate } from "swr";
import OpenDialog, { AdminDialogType } from "@/pages/components/Modal";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { isEmpty, map } from "lodash";
import SquareComponent from "@/pages/components/Square-component";
import StarIcon from "@mui/icons-material/Star";
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
import ProjectInfoComponent from "./Project-Info-component";

interface ProjectDetailsProps {
  projectId: number;
  userRole: string;
}
interface DashType {
  assignedConsultant: string;
  idea1: string;
  idea2: string;
  quotationLink: string;
  extraService?: { id: string; name: string };
}
interface DialogModal {
  [key: string]: {
    isOpen: boolean;
    text?: string;
    type?: string;
    title: string;
    id: string;
  };
}
interface DurationType {
  [key: string]: {
    duration: number;
  };
}
interface ExtraServiceType {
  name: string;
  id: string;
}

export default function ProjectConsultantDetails(props: ProjectDetailsProps) {
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

  const ExtraService: ExtraServiceType[] = [
    {
      id: "designAndDev",
      name: "Design and development plan",
    },
    {
      id: "opeAndMang",
      name: "Operations and management",
    },
    { id: "landlord", name: "Landlord deck" },
    {
      id: "franchise",
      name: "Franchise overview",
    },
  ];

  const [durationInputs, setDuration] = useState<DurationType>();

  const [dashValue, setDash] = useState<DashType>({
    quotationLink: "",
    assignedConsultant: "",
    idea1: "",
    idea2: "",
    extraService: { id: "", name: "" },
  });
  const [isDialogOpen, setIsDialogOpen] = useState<DialogModal>({
    quotationAlert: {
      isOpen: false,
      type: "quotation",
      title: "Alert Stripe payments links Meta Data",
      text: "Have you added the Meta data (projectId) (projectType) (userId) on stripe payment links before adding the quotation ?",
      id: "quotationAlert",
    },
    readyToPay: {
      isOpen: false,
      title: "Go to checkout email and alert",
      type: "inputEmailAlert",
      id: "readyToPay",
    },
    AddExtraService: {
      isOpen: false,
      title: "Add the service order number",
      type: "addServiceOrder",
      id: "AddExtraService",
    },
  });
  const [dialogResult, setDialogResult] = useState<AdminDialogType>();
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
        quotationLink: finalData.paymentLink || "",
      }));

      if (services) {
        setDash((state) => ({
          ...state,
          idea1: services[0]?.serviceName || "",
          idea2: services[1]?.serviceName || "",
        }));
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

  async function handleModalFunction(v: AdminDialogType) {
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
            name: finalData.userName,
          };

          const res = await axios.put(
            "/api/consultant/admin/alertUser",
            params
          );
          if (res.data.success) {
            toast.success("User alerted succussfully!");
            mutate(RefetchUrl);
          } else {
            toast.error("Sorry, something went wrong!");
          }
          break;
        case "addServiceOrder":
          const paramsOrder = {
            service: dashValue.extraService,
            userId: finalData.userId,
            projectId: props.projectId,
            order: v.result.inputValue,
          };

          const resOrder = await axios.put(
            "/api/consultant/admin/addServiceWithOrder",
            paramsOrder
          );
          if (resOrder.data.success) {
            toast.success("Service added succussfully!");
            mutate(RefetchUrl);
          } else {
            toast.error("Sorry, something went wrong!");
          }
          setDash((state) => ({
            ...state,
            extraService: { id: "", name: "" },
          }));
          break;

        case "quotation":
          const paramsQuotation = {
            quotationLink: dashValue.quotationLink,
            projectId: props.projectId,
          };

          const resQuotation = await axios.put(
            "/api/consultant/admin/addQuotation",
            paramsQuotation
          );
          if (resQuotation.data.success) {
            toast.success("Quotation added succussfully!");
            mutate(RefetchUrl);
          } else {
            toast.error("Sorry, something went wrong!");
          }

          break;
        default:
          return null;
      }
    } catch (error) {
      toast.error("Sorry, something went wrong!");
      showSpinner(false);
    } finally {
      showSpinner(false);
    }
  }

  useEffect(() => {
    const handleModalResult = async () => {
      if (dialogResult?.result?.answer === "yes" && isDialogOpen[modalName]) {
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
        toast.success("Consultant added succussfully!");
      } else {
        showSpinner(false);
      }
    } catch (error) {
      showSpinner(false);
    }
  }

  function dialogResultFn(v: AdminDialogType) {
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

  function checkIfFirstUploadIdeaPicking() {
    let check = false;
    if (isEmpty(services[0].serviceValue)) {
      check = true;
    }
    return check;
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
          userName: finalData.userName,
          projectId: props.projectId,
          // check on second upload to alert the user only when second upload on idea gen
          ideaPickingFirstUpload:
            finalData.projectType === "i"
              ? checkIfFirstUploadIdeaPicking()
              : false,

          // check if the value for services are empty then we are still picking idea on idea gen
          ideaPickingPhase:
            (isEmpty(services[0].serviceValue) ||
              isEmpty(services[1].serviceValue)) &&
            finalData.projectType === "i",
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
          ideaPickingPhase:
            serviceId === (services[0].serviceId || services[1].serviceId) &&
            finalData.projectType === "i",
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

  async function addIdeaGen() {
    try {
      showSpinner(true);
      const params = {
        projectId: props.projectId,
        idea1: dashValue.idea1,
        idea2: dashValue.idea2,
      };
      const res = await axios.put(
        "/api/consultant/admin/addIdeaGeneration",
        params
      );
      if (res.data.success) {
        toast.success("Ideas Names added succussfully!");
        mutate(RefetchUrl);
        setDash((state) => ({
          ...state,
          idea1: "",
          idea2: "",
        }));
      } else {
        throw {
          message: "Sorry, something went wrong!",
        };
      }
    } catch (error: any) {
      toast.error("Sorry, something went wrong!");
    } finally {
      showSpinner(false);
    }
  }

  function renderStatus(finalData: finalDataType, v: servicesType) {
    if (
      finalData.projectType === "i" &&
      v.status_value === "complete" &&
      v.serviceName !== "Idea analysis"
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
                  originalProjectId={finalData.upgradeFromProjectId}
                  status_color={finalData.projectColorStatus}
                  status_label={finalData.projectLabelStatus}
                  paymentLink={finalData.paymentLink}
                  info={finalData.info}
                  currentServiceName={
                    finalData.projectType !== "i" ||
                    (finalData.projectType === "i" &&
                      services[0]?.status_value === "complete")
                      ? finalData.currentServiceName
                      : ""
                  }
                  invoice={finalData.invoice}
                  consultantName={finalData.consultantName}
                  comingFrom="details"
                  userRole={props.userRole}
                  userName={finalData.userName}
                  userEmail={finalData.userEmail}
                  userId={finalData.userId}
                />

                {props.userRole === "a" && (
                  <div className={styles.adminDash}>
                    <div style={{ overflowX: "auto" }} className="card">
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
                        <label className={styles.left}>
                          Prepare a quotation
                        </label>
                        <div className={styles.right}>
                          <Input
                            className={`textInput ${styles.right}`}
                            type="text"
                            value={dashValue.quotationLink}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setDash((state) => ({
                                ...state,
                                quotationLink: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className={styles.btnss}>
                          <Button
                            onClick={() => openModal("quotationAlert")}
                            className={`links `}
                            disabled={!dashValue.quotationLink}
                          >
                            Add quotation
                          </Button>
                        </div>
                      </div>
                      <div className={styles.stepsAdmin}>
                        <label className={styles.left}>
                          Assign this project to
                        </label>
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
                            disabled={isEmpty(dashValue.assignedConsultant)}
                            onClick={() => submitAssignee()}
                            className={`links `}
                          >
                            Assign
                          </Button>
                        </div>
                      </div>
                      {finalData.projectType !== "i" && (
                        <div className={styles.stepsAdmin}>
                          <label className={styles.left}>
                            Add extra service{" "}
                          </label>
                          <Select
                            className={`${styles.right} textInput selectInput adminWidthSelector `}
                            value={dashValue.extraService?.id || ""}
                            onChange={(e: SelectChangeEvent) => {
                              const selectedService = ExtraService.find(
                                (service) => service.id === e.target.value
                              );

                              if (selectedService) {
                                setDash((state) => ({
                                  ...state,
                                  extraService: selectedService,
                                }));
                              }
                            }}
                          >
                            <MenuItem key={"none"} value={""}>
                              None
                            </MenuItem>
                            {map(
                              ExtraService,
                              (v: { id: string; name: string }) => (
                                <MenuItem key={v.id} value={v.id}>
                                  {v.name}
                                </MenuItem>
                              )
                            )}
                          </Select>
                          <div className={styles.btnss}>
                            <Button
                              onClick={() => openModal("AddExtraService")}
                              className={`links `}
                              disabled={isEmpty(dashValue.extraService?.id)}
                            >
                              Add service
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className={styles.stepsAdmin}>
                        <label className={styles.left}>
                          Questionnaire review and quotation is done and ready
                          to pay
                        </label>
                        <div className={styles.right}></div>
                        <div className={styles.btnss}>
                          <Button
                            onClick={() => openModal("readyToPay")}
                            className={`links `}
                            disabled={!dashValue.quotationLink}
                          >
                            Ready to pay
                          </Button>
                        </div>
                      </div>

                      {finalData.projectType === "i" && (
                        <>
                          <div className={styles.stepsAdmin}>
                            <label className={styles.left}>idea 1</label>
                            <Input
                              className={`textInput ${styles.right}`}
                              type="text"
                              value={dashValue.idea1}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setDash((state) => ({
                                  ...state,
                                  idea1: e.target.value,
                                }))
                              }
                            />
                            <div className={styles.btnss}></div>
                          </div>
                          <div className={styles.stepsAdmin}>
                            <label className={styles.left}>idea 2</label>
                            <Input
                              className={`textInput ${styles.right}`}
                              type="text"
                              value={dashValue.idea2}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setDash((state) => ({
                                  ...state,
                                  idea2: e.target.value,
                                }))
                              }
                            />
                            <div className={styles.btnss}>
                              <Button
                                disabled={!dashValue.idea1 || !dashValue.idea2}
                                onClick={() => addIdeaGen()}
                                className={`links `}
                              >
                                Add ideas Name
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className={styles.stepsContainer}>
                  <>
                    {services?.map((v: servicesType, i: number) => (
                      <div key={v.serviceName} className={styles.services}>
                        <div
                          className={`${styles.serviceImgContainer} ${
                            i === services.length - 1 ? styles.lastService : ""
                          }`}
                        >
                          <span className={styles.number}>{i + 1}</span>
                        </div>

                        <div className={styles.serviceName}>
                          {v.serviceName}
                        </div>

                        {props.userRole === "a" && (
                          <div className={styles.duration}>
                            {(i !== 1 || finalData.projectType !== "i") && (
                              <>
                                <Input
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
                                      [v.serviceId]: {
                                        duration: e.target.value,
                                      },
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
                              </>
                            )}
                          </div>
                        )}

                        <div className={styles.status}>
                          {renderStatus(finalData, v)}
                        </div>

                        <div>
                          {v.serviceValue?.secure_url && (
                            <div className={styles.download}>
                              <a
                                href={v.serviceValue?.secure_url}
                                download={v.serviceValue?.original_filename}
                              >
                                <DownloadIcon />
                                Download File
                              </a>
                            </div>
                          )}
                        </div>

                        <div className={`${styles.action}`}>
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
            projectId={props.projectId}
            chatroom={1}
            customer={0}
            isPaid={finalData.invoice ? true : false}
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

      <OpenDialog
        title={isDialogOpen[modalName]?.title}
        id={isDialogOpen[modalName]?.id}
        btnName="Confirm"
        type={isDialogOpen[modalName]?.type}
        text={isDialogOpen[modalName]?.text}
        openDialog={isDialogOpen[modalName]?.isOpen || false}
        onCloseDialog={(v) => dialogResultFn(v as AdminDialogType)}
      />
    </>
  );
}
