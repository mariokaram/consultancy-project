import styles from "@/styles/Chatroom.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/pricing-image.png";
import tick from "~/public/icons/tick.svg";
import redirect from "~/public/icons/redirect.svg";
import ContactBanner from "./components/Contact-Banner";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import Info from "~/public/icons/info.svg";

import arrowRight from "~/public/icons/arrow-right.svg";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Collapse,
  IconButton,
  Input,
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
  receiverId: string;
  name: string;
}

export default function ChatroomPage(props: ChatroomProps) {
  const mediaQuery = useMediaQuery("(max-width:1000px)");
  const mediaQuery14 = useMediaQuery("(max-width:1400px)");
  const mediaQuery6 = useMediaQuery("(max-width:600px)");
  const router = useRouter();

  const query =
    props.role === "u"
      ? "/api/chatroom/getMessages"
      : `/api/chatroom/getMessages?userID=${props.receiverId}`;

  const { data, error } = useSWR(query, {
    refreshInterval: 60000,
  });

  const [messageInput, setMessageInput] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { showSpinner } = useContext(SpinnerContext);
  const handleSendMessage = async () => {
    if (messageInput) {
      try {
        showSpinner(true);

        const params = {
          message: messageInput,
          receiverId: props.receiverId,
          date: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        const newMessage = {
          message: messageInput,
          date: moment().format("YYYY-MM-DD HH:mm:ss"),
          msgFrom: props.role,
          userName: props.name,
          consultantName: props.name,
          id: "newMsg",
        };
        const updatedData = [...data, newMessage];

        // Use mutate to update the cache
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
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent newline on "Enter" press
      handleSendMessage(); // Send the message
    }
  };
  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data]);
  return (
    <>
      <section>
        <div className={styles.mainContainer}>
          <>
            <div className={styles.sideBar}>
              <div className={styles.dashTitle}>My Dashboard</div>
              <div className={styles.btns}>
                <Button
                  fullWidth
                  className={`links ${styles.infoNotSelected}`}
                  onClick={() => router.push("/dashboard")}
                >
                  Projects
                </Button>
                <Button fullWidth className={`links ${styles.infoNotSelected}`}>
                  Order Details
                </Button>
                <Button
                  fullWidth
                  className={`btn btn-secondary ${styles.btnInfo}`}
                >
                  Chatroom
                </Button>
              </div>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.upperBtn}>
                <div className={`subTitle ${styles.titles}`}>Chatroom</div>
              </div>

              {!error && (
                <div>
                  <Container maxWidth="xl" className={styles.chatContainer}>
                    <Paper
                      ref={chatContainerRef}
                      className={styles.chatMessages}
                    >
                      {data?.map((message: any, index: number) => (
                        <div
                          key={index}
                          className={` ${styles.message} ${
                            message.msgFrom === props.role
                              ? `${styles.userMessage}`
                              : `${styles.consultantMessage}`
                          }`}
                        >
                          <Typography variant="subtitle1" gutterBottom>
                            <>
                              {message.msgFrom === "u"
                                ? message.userName
                                : message.consultantName}
                              {message.date && (
                                <>
                                  <span> - </span>
                                  {moment
                                    .utc(message.date)
                                    .format("DD/MM/YYYY HH:mm")}
                                </>
                              )}
                            </>
                          </Typography>
                          <Typography variant="body1">
                            {message.message}
                          </Typography>
                        </div>
                      ))}
                    </Paper>
                    <div className={styles.messageInput}>
                      <Input
                        className="textInput"
                        fullWidth
                        placeholder="Message"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <Button
                        variant="contained"
                        className="btn-secondary"
                        onClick={handleSendMessage}
                      >
                        Send
                      </Button>
                    </div>
                  </Container>
                </div>
              )}

              {error && (
                <div>
                  <Alert severity="error" sx={{ mt: 2 }}>
                    <AlertTitle>Something went wrong</AlertTitle>
                    Try reloading this page , or contact customer service if
                    this issue persists!
                  </Alert>
                </div>
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

import { executeQuery } from "@/lib/db";
import { ChatListType } from "./api/chatroom/getMessages";
import { SpinnerContext } from "@/contexts/SpinnerContextProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const sql = require("sql-template-strings");
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, optionsAuth);
  if (session) {
    const role: string = session.user.role === "a" ? "c" : session.user.role;
    const name: string = session.user.name as string;

    if (session.user.role === "u") {
      const id: string = session.user.id;

      // check if user has project
      const getConsultantId: {
        successQuery: boolean;
        data: any;
      } = (await executeQuery(sql`
            select p.consultant_id from projects p where customer_id = ${id} and paid= 1 limit 1
          `)) as {
        successQuery: boolean;
        data: any;
      };

      // if no go to dashboard
      if (
        !getConsultantId.successQuery ||
        isEmpty(JSON.parse(getConsultantId.data))
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
          receiverId: JSON.parse(getConsultantId.data)[0]?.consultant_id,
          name,
        },
      };
    } else {
      const query = context?.query;
      return { props: { role, receiverId: query?.userID || "", name } };
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
