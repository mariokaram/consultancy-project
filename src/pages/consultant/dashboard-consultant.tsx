import styles from "@/styles/Dashboard-consultant.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/pricing-image.png";
import tick from "~/public/icons/tick.svg";
import redirect from "~/public/icons/redirect.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import Info from "~/public/icons/info.svg";

import Button from "@mui/material/Button";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { isEmpty, map, result } from "lodash";
import { ProjectListType } from "@/pages/api/dashboard/getProjects";
import moment from "moment";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
import ProjectDetails from "@/pages/components/projects";

interface ISOPENTYPE {
  [id: number]: boolean;
}
interface DashboardPropsType {
  userRole: string;
}

export default function DashboardConsultantPage(props: DashboardPropsType) {
  const mediaQuery = useMediaQuery("(max-width:1000px)");
  const mediaQuery14 = useMediaQuery("(max-width:1400px)");
  const mediaQuery6 = useMediaQuery("(max-width:600px)");
  const router = useRouter();

  const [viewProject, setViewProject] = useState(null);

  const { data, error, isValidating } = useSWR(
    "/api/consultant/getProjects-consultant",
    {
      revalidateOnFocus: false,
    }
  );
  const dataResult: ProjectConsultantListType[] = data?.result;

  function openProjectDetails(projectId: number) {
    router.push(`dashboard-consultant?project=${projectId}`);
  }

  useEffect(() => {
    if (isEmpty(router.query)) {
      setViewProject(null);
      mutate("/api/consultant/getProjects-consultant");
    } else {
      const project: any = router.query.project;
      setViewProject(project);
    }
  }, [router]);

  const [open, setOpen] = React.useState<ISOPENTYPE>({});

  return (
    <>
      <section>
        <div className={styles.mainContainer}>
          {isValidating && (
            <div className={styles.loading}>
              <CircularProgress
                style={{ color: "var(--secondaryColor)" }}
                size={50}
              ></CircularProgress>
            </div>
          )}
          {!isValidating && (
            <>
              <div className={styles.sideBar}>
                <div className={styles.dashTitle}>My Dashboard</div>
                <div className={styles.btns}>
                  <Button
                    fullWidth
                    className={`btn btn-secondary ${styles.btnInfo}`}
                  >
                    Projects
                  </Button>
                  <Button
                    fullWidth
                    className={`links ${styles.infoNotSelected}`}
                  >
                    Order Details
                  </Button>
                  <Button
                    fullWidth
                    className={`links ${styles.infoNotSelected}`}
                  >
                    Chatroom
                  </Button>
                </div>
              </div>

              {viewProject && !error ? (
                <div className={styles.rightSide}>
                  <ProjectConsultantDetails
                    userRole={props.userRole}
                    projectId={viewProject}
                  />
                </div>
              ) : (
                <div className={styles.rightSide}>
                  <div className={styles.upperBtn}>
                    <div className={`subTitle ${styles.titles}`}>Projects</div>
                  </div>

                  {!isEmpty(dataResult) &&
                    map(dataResult, (v: ProjectConsultantListType) => (
                      <div key={v.project_id} className={styles.projects}>
                        <div className="card">
                          <div style={{ paddingBottom: "1rem" }}>
                            <Collapse in={open[v.project_id]}>
                              <Alert
                                severity="info"
                                action={
                                  <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                      setOpen((prevOpen) => ({
                                        ...prevOpen,
                                        [v.project_id]: false,
                                      }));
                                    }}
                                  >
                                    <CloseIcon fontSize="inherit" />
                                  </IconButton>
                                }
                                sx={{ mb: 2 }}
                              >
                                <AlertTitle>
                                  Info seen by the client {v.userName}
                                </AlertTitle>
                                {isNaN(v.info as number)
                                  ? v.info
                                  : `Estimatinh time is around ${v.info} business days`}
                              </Alert>
                            </Collapse>
                          </div>
                          <div className={styles.cardInfo}>
                            <div className={styles.cardTitle}>
                              <div className="title">{v.companyName}</div>
                              <div>
                                Project ID: <strong>{v.project_id}</strong>
                              </div>
                              <div>
                                User name: <strong>{v.userName}</strong>
                              </div>
                              {props.userRole === "a" && (
                                <div>
                                  User ID: <strong>{v.userId}</strong>
                                </div>
                              )}

                              <div>
                                User email: <strong>{v.userEmail}</strong>
                              </div>
                              <div>
                                Service plan :{" "}
                                <strong
                                  style={{ color: "var(--secondaryColor)" }}
                                >
                                  {v.projectType}
                                </strong>
                              </div>
                              <div>
                                Created on{" "}
                                {moment
                                  .utc(v.date_creation)
                                  .format("DD-MM-YYYY")}
                              </div>
                            </div>
                            <div className={styles.statusInfo}>
                              {v.consultantName && (
                                <div style={{ paddingBottom: "0.5rem" }}>
                                  Assigned to{" "}
                                  <strong>{v.consultantName}</strong>
                                </div>
                              )}
                              {!v.consultantName && (
                                <div style={{ paddingBottom: "0.5rem" }}>
                                  <small>Consultant not assigned yet</small>{" "}
                                </div>
                              )}

                              <div className={styles.status}>
                                <div>
                                  <Badge
                                    className={v.status_color}
                                    variant="dot"
                                  ></Badge>
                                </div>
                                <div>{v.status_label}</div>
                                {!open[v.project_id] && (
                                  <div>
                                    <Image
                                      onClick={() => {
                                        setOpen((prevOpen) => ({
                                          ...prevOpen,
                                          [v.project_id]: true,
                                        }));
                                      }}
                                      style={{ cursor: "pointer" }}
                                      alt="info"
                                      src={Info}
                                    />
                                  </div>
                                )}
                              </div>
                              <div
                                className={styles.review}
                                onClick={() =>
                                  router.push(
                                    `/questionnaire?service=${v.projectType}&project=${v.project_id}&userId=${v.userId}`
                                  )
                                }
                              >
                                <div>Review questionnaire</div>
                                <div>
                                  <Image alt="arrow" src={arrowRight} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.btnCards}>
                            <div>
                              <Button
                                onClick={() => openProjectDetails(v.project_id)}
                                className="btn btn-secondary"
                              >
                                View Project
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {isEmpty(dataResult) && !error && (
                    <div>
                      <Alert severity="info" sx={{ mt: 2 }}>
                        <AlertTitle>No projects found</AlertTitle>
                      </Alert>
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
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
import { executeQuery } from "@/lib/db";
import { ProjectConsultantListType } from "../api/consultant/getProjects-consultant";
import ProjectConsultantDetails from "../components/projects-consultant";
import axios from "axios";
const sql = require("sql-template-strings");
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, optionsAuth);
  if (session && (session.user.role === "c" || session.user.role === "a")) {
    const query = context?.query;
    const id: string = session.user.id;

    // check if consultant has this project
    if (query.project && !isEmpty(query.project) && session.user.role === "c") {
      const checkIfhasProjects: {
        successQuery: boolean;
        data: any;
      } = (await executeQuery(sql`
        select p.project_id from projects p where consultant_id = ${id} and project_id=${query.project}
      `)) as {
        successQuery: boolean;
        data: any;
      };

      // if no go to dashboard
      if (
        !checkIfhasProjects.successQuery ||
        isEmpty(JSON.parse(checkIfhasProjects.data))
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
          userRole: session.user.role,
        },
      };
    }
    // if in dashboard or is admin
    else {
      return {
        props: {
          userRole: session.user.role,
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
