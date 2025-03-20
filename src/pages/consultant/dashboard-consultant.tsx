import styles from "@/styles/Dashboard-consultant.module.scss";
import Image from "next/image";
import { ProjectConsultantListType } from "../api/consultant/getProjects-consultant";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { isEmpty, map } from "lodash";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
import ProjectConsultantDetails from "@/pages/components/projects-consultant";
import banner from "~/public/imgs/banner.webp";
import ProjectInfoComponent from "@/pages/components/Project-Info-component";
import noResult from "~/public/imgs/noResult.webp";
import SEO from "@/pages/components/SEO";

interface DashboardPropsType {
  userRole: string;
}

export default function DashboardConsultantPage(props: DashboardPropsType) {
  const router = useRouter();

  const [viewProject, setViewProject] = useState(null);
  const [initPage, setInitPage] = useState(true);

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
      if (!initPage) {
        mutate("/api/consultant/getProjects-consultant");
      }
    } else {
      const project: any = router.query?.project;
      setViewProject(project);
    }

    // Set initPage to false after initial load
    setInitPage(false);
  }, [router]);

  return (
    <>
      <SEO noIndex={true} title="Dashboard - Horizon Consultancy" />
      <section>
        <div className={styles.mainContainer}>
          {isValidating && (
            <div className={styles.loading}>
              <CircularProgress
                style={{ color: "var(--blueColor)" }}
                size={50}
              ></CircularProgress>
            </div>
          )}
          {!isValidating && (
            <>
              <div className={styles.projectBanner}>
                <Image quality={100} alt="image banner" priority src={banner} />
                <div className={styles.bannerTitle}>
                  {viewProject ? "Project Overview" : "Projects"}
                </div>
              </div>

              {viewProject && !error ? (
                <ProjectConsultantDetails
                  userRole={props.userRole}
                  projectId={viewProject}
                />
              ) : (
                <div className={styles.projectContainer}>
                  <div className={styles.content}>
                    {!isEmpty(dataResult) &&
                      !error &&
                      map(dataResult, (v: ProjectConsultantListType) => (
                        <ProjectInfoComponent
                          key={v.project_id}
                          project_id={v.project_id}
                          companyName={v.companyName}
                          projectTypeName={v.projectTypeName}
                          date_creation={v.date_creation}
                          comingFrom="project"
                          userRole={props.userRole}
                          originalProjectId={v.upgradeFromProjectId}
                          userName={v.userName}
                          paymentLink={v.paymentLink}
                          userEmail={v.userEmail}
                          currentServiceName={
                            v.projectTypeName !== "Ideas generation" ||
                            (v.projectTypeName === "Ideas generation" &&
                              v.currentServiceName === "Idea analysis")
                              ? v.currentServiceName
                              : ""
                          }
                          userId={v.userId}
                          status_value={v.status_value}
                          invoice={v.invoice}
                          status_color={v.status_color}
                          status_label={v.status_label}
                          info={v.info}
                          consultantName={v.consultantName}
                          openProjectDetails={openProjectDetails}
                        />
                      ))}

                    {isEmpty(dataResult) && !error && (
                      <div className={styles.EmptyListSection}>
                        <div className={styles.info}>
                          <div>
                            <div className="subTitle">
                              It seems you haven&apos;t started any projects
                              yet.
                            </div>
                          </div>
                          <div className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Error amet libero soluta vel, reiciendis
                            incidunt maiores dolore! Perspiciatis architecto
                            iusto odit at harum, officia suscipit minima quae
                            expedita excepturi ratione.
                          </div>
                          <div>
                            <Button
                              onClick={() => router.push("/pricing")}
                              className="btn btn-secondary"
                              size="large"
                            >
                              Start a new Project
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Image src={noResult} alt="norResultImg" />
                        </div>
                      </div>
                    )}
                    {error && (
                      <div className={styles.error}>
                        <Alert severity="error" sx={{ mt: 2 }}>
                          <AlertTitle>Something went wrong</AlertTitle>
                          Try reloading this page , or contact customer service
                          if this issue persists!
                        </Alert>
                      </div>
                    )}
                  </div>
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
            destination: "/consultant/dashboard-consultant",
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
