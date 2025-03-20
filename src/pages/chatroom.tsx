import styles from "@/styles/Chatroom.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/pricing-image.png";
import tick from "~/public/icons/tick.svg";
import redirect from "~/public/icons/redirect.svg";
import ContactBanner from "./components/Contact-Banner";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import Info from "~/public/icons/info.svg";
import banner from "~/public/imgs/banner.webp";
import SquareComponent from "./components/Square-component";
import { ConsultantProfile, consultants, insertLogs } from "@/utils/shared";
import arrowRight from "~/public/icons/arrow-right.svg";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { SpinnerContext } from "@/contexts/SpinnerContextProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import attach from "~/public/icons/attach.svg";
import remove from "~/public/icons/remove.svg";
import pdf from "~/public/icons/pdf.svg";
import SEO from "@/pages/components/SEO";

import {
  Alert,
  AlertTitle,
  CircularProgress,
  Collapse,
  IconButton,
  Input,
  InputAdornment,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useRef, useState, useContext } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { isEmpty, map, result } from "lodash";
import { ProjectListType } from "./api/dashboard/getProjects";
import moment from "moment";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
import ProjectDetails from "./components/projects";
import { Container, Paper, TextField, Button } from "@mui/material";
interface ChatroomProps {
  role: string;
  name: string;
  email: string;
  receiverId: string;
  projectId: number;
  consultantId: string;
}

export default function ChatroomPage(props: ChatroomProps) {
  const router = useRouter();

  const query = `/api/chatroom/getMessages?projectId=${props.projectId}`;

  const { data, error, isValidating } = useSWR<ChatListType[]>(query, {
    refreshInterval: 60000,
  });

  const [messageInput, setMessageInput] = useState<string>("");
  const [consultantinfo, setConsultantInfo] = useState<
    ConsultantProfile | undefined
  >();
  const [initLoad, setInitLoad] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { showSpinner } = useContext(SpinnerContext);

  const fileType = ["application/pdf"];

  const handleSendMessage = async () => {
    if (messageInput) {
      try {
        showSpinner(true);

        const params = {
          message: messageInput,
          receiverId: props.receiverId,
          projectId: props.projectId,
          consultantId: props.role === "a" ? props.consultantId : "",
        };

        const newMessage = {
          message: messageInput,
          date: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
          msgFrom: props.role,
          userName: props.name,
          id: "newMsg",
        };
        const updatedData = [...(data || []), newMessage];

        mutate(query, updatedData, false);

        const res: any = await axios.post("/api/chatroom/postMsg", params);

        if (res.data.success) {
          showSpinner(false);
          setMessageInput("");
        } else {
          showSpinner(false);
          const updatedDataWithoutNewMessage = updatedData.filter(
            (message) => message.id !== newMessage.id
          );
          mutate(query, updatedDataWithoutNewMessage, false);
          toast.error("Sorry, something went wrong!");
        }
      } catch (error: any) {
        showSpinner(false);
        toast.error("Sorry, something went wrong!");
      }
    }
  };

  //get consultant info
  useEffect(() => {
    const addConsultantInfo = () => {
      const selectedConsultant = consultants.find(
        (consultant) => consultant.id === props.consultantId
      );
      if (selectedConsultant) {
        setConsultantInfo(selectedConsultant);
      }
    };

    addConsultantInfo();
  }, []);

  // scroll down after message
  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data]);

  // on init skeleton
  useEffect(() => {
    if (!isValidating && !initLoad) {
      setInitLoad(true);
    }
  }, [isValidating]);

  async function getSignature(id: number, name: string): Promise<any> {
    try {
      const params = {
        folderName: "chatroom",
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

  const handleRemove = async (message: ChatListType) => {
    try {
      showSpinner(true);
      let params: any;
      params = { id: JSON.parse(message.fileUpload)?.public_id };
      const res = await axios.get("/api/cloudinary/cloudinaryDelete", {
        params,
      });
      if (res.data.success) {
        params = {
          removeConvId: message.id,
        };
        const resDeleteApi = await axios.post("/api/chatroom/postMsg", params);
        if (resDeleteApi.data.success) {
          toast.success("File deleted successfully!");
        } else {
          throw {
            message: "delete imageValue on chatroom",
          };
        }
      } else {
        throw {
          message: "delete imageValue on cloudinary",
        };
      }
    } catch (error: any) {
      insertLogs("client", "removeImage", "chatroom", error?.message);
      toast.error("Sorry, something went wrong!");
    } finally {
      mutate(query);
      showSpinner(false);
    }
  };

  const retrunImage = async (v: File) => {
    try {
      showSpinner(true);
      const url: string = `${configs.cloudinary_url}`;
      const { signature, timestamp } = await getSignature(
        props.projectId,
        v.name
      );
      const formData = new FormData();
      formData.append("file", v);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("folder", `chatroom/${props.projectId}/${v.name}`);
      formData.append("use_filename", "true");
      formData.append("overwrite", "true");
      formData.append("transformation", "fl_attachment");
      formData.append("api_key", `${configs.cloudinary_api_key}`);

      const response = await fetch(url, {
        method: "post",
        body: formData,
      });

      const dataImage = await response.json();
      if (dataImage.error) {
        toast.error("Sorry, something went wrong!");
        insertLogs("client", "formData", "chatroom", dataImage.error?.message);
      } else {
        const params = {
          imageInfo: {
            public_id: dataImage.public_id,
            secure_url: dataImage.secure_url,
            original_filename: dataImage.original_filename,
          },
          message: "",
          receiverId: props.receiverId,
          projectId: props.projectId,
          consultantId: props.role === "a" ? props.consultantId : "",
        };
        const res = await axios.post("/api/chatroom/postMsg", params);
        if (res.data.success) {
          mutate(query);
          toast.success("File uploaded successfully!");
          showSpinner(false);
        } else {
          toast.error("Sorry, something went wrong!");
          showSpinner(false);
        }
      }
    } catch (error: any) {
      toast.error("Sorry, something went wrong!");
      insertLogs("client", "formData", "chatroom", error?.message);
      showSpinner(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      showSpinner(true);

      if (selectedFile && fileType.includes(selectedFile.type)) {
        if (selectedFile.size < 5000000) {
          retrunImage(selectedFile);
        } else {
          showSpinner(false);
          toast.error("Please select a valid pdf size below 5MB");
        }
      } else {
        showSpinner(false);
        toast.error("Please select a valid pdf file");
      }
    }
  };

  return (
    <>
      <SEO noIndex={true} title="Chatroom - Horizon Consultancy" />

      <section style={{ margin: "0 5rem" }}>
        <div className={styles.mainContainer}>
          <>
            <div className={styles.projectBanner}>
              <Image quality={100} alt="image banner" priority src={banner} />
              <div className={styles.bannerTitle}>Chatroom</div>
            </div>

            <div className={styles.projectContainer}>
              <div className={styles.content}>
                {!error && (
                  <div className={styles.msgContent}>
                    <div className={styles.convSection}>
                      <div ref={chatContainerRef} className={styles.convList}>
                        {isValidating && !initLoad ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                              }}
                            >
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                width={50}
                                height={50}
                              />
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width="90%"
                                height={80}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                              }}
                            >
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width="90%"
                                height={80}
                              />
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                width={50}
                                height={50}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                              }}
                            >
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                width={50}
                                height={50}
                              />
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width="90%"
                                height={80}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                              }}
                            >
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                width={50}
                                height={50}
                              />
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width="90%"
                                height={80}
                              />
                            </div>
                          </>
                        ) : (
                          data?.map((message: ChatListType, index: number) => (
                            <div key={index}>
                              <>
                                {message.msgFrom === "u" ? (
                                  <div className={styles.userMessage}>
                                    <div className={styles.convInfo}>
                                      <div className={styles.cardMsg}>
                                        {message.fileUpload ? (
                                          <div className={styles.existingPdf}>
                                            <Image
                                              style={{ marginRight: ".5rem" }}
                                              alt="pdf"
                                              src={pdf}
                                            />
                                            {
                                              <a
                                                href={
                                                  JSON.parse(message.fileUpload)
                                                    ?.secure_url
                                                }
                                                download={
                                                  JSON.parse(message.fileUpload)
                                                    ?.original_filename
                                                }
                                              >
                                                {
                                                  JSON.parse(message.fileUpload)
                                                    .original_filename
                                                }
                                              </a>
                                            }
                                            {props.role === "a" ||
                                              (message.msgFrom ===
                                                props.role && (
                                                <Image
                                                  style={{
                                                    marginLeft: ".8rem",
                                                    cursor: "pointer",
                                                  }}
                                                  alt="remove"
                                                  src={remove}
                                                  onClick={() =>
                                                    handleRemove(message)
                                                  }
                                                />
                                              ))}
                                          </div>
                                        ) : (
                                          message.message
                                        )}
                                      </div>
                                      <div className={styles.dateMsg}>
                                        {props.name} -{" "}
                                        {moment
                                          .utc(message.date)
                                          .local()
                                          .format("DD/MM/YYYY HH:mm")}
                                      </div>
                                    </div>
                                    <div className={styles.convImg}>
                                      <Avatar
                                        alt="initials"
                                        className={styles.avatarInitials}
                                      >
                                        {props.email[0]}
                                      </Avatar>
                                    </div>
                                  </div>
                                ) : (
                                  <div className={styles.consultantMsg}>
                                    <div className={styles.convImg}>
                                      <Image
                                        alt="pic"
                                        src={consultantinfo?.imageSrc || ""}
                                        width={50}
                                        height={50}
                                      />
                                    </div>
                                    <div className={styles.convInfo}>
                                      <div className={styles.cardMsg}>
                                        {message.fileUpload ? (
                                          <div className={styles.existingPdf}>
                                            <Image
                                              style={{ marginRight: ".5rem" }}
                                              alt="pdf"
                                              src={pdf}
                                            />
                                            {
                                              <a
                                                href={
                                                  JSON.parse(message.fileUpload)
                                                    ?.secure_url
                                                }
                                                download={
                                                  JSON.parse(message.fileUpload)
                                                    ?.original_filename
                                                }
                                              >
                                                {
                                                  JSON.parse(message.fileUpload)
                                                    .original_filename
                                                }
                                              </a>
                                            }
                                            {(props.role === "a" ||
                                              message.msgFrom ===
                                                props.role) && (
                                              <Image
                                                style={{
                                                  marginLeft: ".8rem",
                                                  cursor: "pointer",
                                                }}
                                                alt="remove"
                                                src={remove}
                                                onClick={() =>
                                                  handleRemove(message)
                                                }
                                              />
                                            )}
                                          </div>
                                        ) : (
                                          message.message
                                        )}
                                      </div>
                                      <div className={styles.dateMsg}>
                                        {consultantinfo?.name} -{" "}
                                        {moment
                                          .utc(message.date)
                                          .local()
                                          .format("DD/MM/YYYY HH:mm")}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            </div>
                          ))
                        )}
                      </div>

                      <div className={`${styles.messageInput} chatMsg `}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={3}
                          placeholder="Type a message"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <div className={styles.attachWrapper}>
                                  <label htmlFor="file-upload">
                                    <Image
                                      alt="attachment"
                                      src={attach}
                                      style={{
                                        cursor: "pointer",
                                      }}
                                    />
                                    <input
                                      id="file-upload"
                                      type="file"
                                      accept="application/pdf"
                                      hidden
                                      onChange={handleFileChange}
                                    />
                                  </label>
                                  <div className={styles.verticalLine}></div>
                                </div>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Button
                          size="small"
                          disabled={isValidating && !initLoad}
                          className={`${styles.btnSend} btn-secondary`}
                          onClick={handleSendMessage}
                        >
                          <SendIcon fontSize="medium" />
                        </Button>
                      </div>
                    </div>
                    <div className={styles.infoSection}>
                      <div className={styles.consultImg}>
                        {isValidating && !initLoad ? (
                          <Skeleton
                            animation="wave"
                            variant="circular"
                            width={130}
                            height={130}
                          />
                        ) : (
                          <Image
                            src={consultantinfo?.imageSrc || ""}
                            width={130}
                            height={130}
                            alt="consultImg"
                          />
                        )}
                      </div>
                      <div className={styles.consultName}>
                        {isValidating && !initLoad ? (
                          <Skeleton
                            animation="wave"
                            style={{ margin: "0 auto" }}
                            variant="text"
                            width="40%"
                          />
                        ) : (
                          consultantinfo?.name
                        )}
                      </div>
                      <div className={styles.consultField}>
                        {isValidating && !initLoad ? (
                          <Skeleton
                            animation="wave"
                            style={{ margin: "0 auto" }}
                            variant="text"
                            width="60%"
                          />
                        ) : (
                          consultantinfo?.field
                        )}
                      </div>
                      <div className={styles.consultTitle}>
                        {isValidating && !initLoad ? (
                          <Skeleton
                            animation="wave"
                            style={{ margin: "0 auto" }}
                            variant="text"
                            width="30%"
                          />
                        ) : (
                          <>
                            <BusinessCenterIcon className={styles.icn} />
                            {consultantinfo?.focus}
                          </>
                        )}
                      </div>

                      <div className={styles.horizontal}></div>
                      <div className={styles.fileTitle}>Shared files</div>
                      <div className={styles.fileSection}>
                        {isValidating && !initLoad ? (
                          <>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width="70%"
                            />
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width="70%"
                            />
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width="70%"
                            />
                          </>
                        ) : (
                          <>
                            {data?.map((v: ChatListType, i) =>
                              v.fileUpload ? (
                                <a
                                  key={i}
                                  href={JSON.parse(v.fileUpload)?.secure_url}
                                  download={
                                    JSON.parse(v.fileUpload)?.original_filename
                                  }
                                >
                                  {JSON.parse(v.fileUpload).original_filename}
                                </a>
                              ) : (
                                ""
                              )
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className={styles.error}>
                    <Alert severity="error" sx={{ mt: 2 }}>
                      <AlertTitle>Something went wrong</AlertTitle>
                      Try reloading this page , or contact customer service if
                      this issue persists!
                    </Alert>
                  </div>
                )}
              </div>
              {isValidating && !initLoad ? (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={400}
                  height={400}
                />
              ) : (
                <SquareComponent
                  schedule={error ? 0 : 1}
                  customer={error ? 1 : 0}
                />
              )}
            </div>
          </>
        </div>
      </section>
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

type Params = {
  query: {
    projectId: number;
  };
};

import { executeQuery } from "@/lib/db";
import ImageUpload from "./components/ImageUpload";
import { configs } from "@/utils/config";
import { ChatListType } from "./api/chatroom/getMessages";
const sql = require("sql-template-strings");
export async function getServerSideProps(
  context: GetServerSidePropsContext & Params
) {
  const session = await getServerSession(context.req, context.res, optionsAuth);
  const { projectId } = context.query;

  if (session) {
    const { role, name, id, email } = session.user;

    if (role === "u") {
      // check if user has project and paid
      const checkProjectExists: {
        successQuery: boolean;
        data: any;
      } = (await executeQuery(sql`
            select p.project_id , p.consultant_id from projects p where p.customer_id = ${id} and p.checkoutId IS NOT NULL and p.project_id = ${projectId}
          `)) as {
        successQuery: boolean;
        data: any;
      };

      // if no go to dashboard
      if (
        !checkProjectExists.successQuery ||
        !projectId ||
        isEmpty(JSON.parse(checkProjectExists.data))
      ) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      }
      return {
        props: {
          role,
          email,
          receiverId: JSON.parse(checkProjectExists.data)[0]?.consultant_id,
          consultantId: JSON.parse(checkProjectExists.data)[0]?.consultant_id,
          name,
          projectId,
        },
      };
    } else {
      const { projectId } = context?.query;

      let checkProjectExistsConsultant: {
        successQuery: boolean;
        data: any;
      };

      if (role === "c") {
        checkProjectExistsConsultant = (await executeQuery(sql`
        select p.project_id , p.consultant_id  , p.customer_id , u.name , u.email from projects p
        inner join users u on u.id = p.customer_id
        where p.project_id = ${projectId} and p.consultant_id = ${id} and p.checkoutId IS NOT NULL          
        
      `)) as {
          successQuery: boolean;
          data: any;
        };
      } else {
        checkProjectExistsConsultant = (await executeQuery(sql`
        select p.project_id , p.consultant_id ,p.customer_id , u.name , u.email from projects p
        inner join users u on u.id = p.customer_id
        where p.project_id = ${projectId}          
        
      `)) as {
          successQuery: boolean;
          data: any;
        };
      }

      if (
        !checkProjectExistsConsultant.successQuery ||
        !projectId ||
        isEmpty(JSON.parse(checkProjectExistsConsultant.data))
      ) {
        return {
          redirect: {
            destination: "/consultant/dashboard-consultant",
            permanent: false,
          },
        };
      }

      return {
        props: {
          role,
          receiverId: JSON.parse(checkProjectExistsConsultant.data)[0]
            ?.customer_id,
          consultantId: JSON.parse(checkProjectExistsConsultant.data)[0]
            ?.consultant_id,
          projectId,
          name: JSON.parse(checkProjectExistsConsultant.data)[0]?.name,
          email: JSON.parse(checkProjectExistsConsultant.data)[0]?.email,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
}
