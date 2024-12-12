import styles from "@/styles/Dashboard.module.scss";
import Image from "next/image";
import banner from "~/public/imgs/banner.webp";
import noResult from "~/public/imgs/noResult.webp";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { isEmpty, map } from "lodash";
import { ProjectListType } from "./api/dashboard/getProjects";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
import ProjectDetails from "./components/projects";
import SquareComponent from "./components/Square-component";
import ProjectInfoComponent from "./components/Project-Info-component";

interface DashboardPropsType {
  userRole: string;
}

export default function DashboardPage(props: DashboardPropsType) {
  const router = useRouter();
  const [initPage, setInitPage] = useState(true); // Add initPage boolean
  const [viewProject, setViewProject] = useState(null);

  const { data, error, isValidating } = useSWR("/api/dashboard/getProjects", {
    revalidateOnFocus: false,
  });
  const dataResult: ProjectListType[] = data?.result;

  function openProjectDetails(projectId: number) {
    router.push(`dashboard?project=${projectId}`);
  }
  function checkUrlIfPaid(): boolean {
    // Get the current URL's search parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Check if the "paymentStatus" parameter is set to "success"
    return urlParams.get("paymentStatus") === "success";
  }

  useEffect(() => {
    const delay = 5000; // 5 seconds delay

    // Check if payment is successful
    if (checkUrlIfPaid()) {
      const timeout = setTimeout(async () => {
        // Trigger mutation to revalidate the data
        router.replace("/dashboard");
      }, delay); // Wait for 3 seconds before executing the mutation

      // Cleanup on component unmount
      return () => clearTimeout(timeout);
    }
  }, []); // Depending on dataResult, you can trigger this effect

  useEffect(() => {
    if (isEmpty(router.query?.project)) {
      setViewProject(null);
      if (!initPage) {
        mutate("/api/dashboard/getProjects");
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
      <section style={{ margin: "0 5rem" }}>
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
                <ProjectDetails
                  projectId={viewProject}
                  userRole={props.userRole}
                />
              ) : (
                <div className={styles.projectContainer}>
                  <div className={styles.content}>
                    {!isEmpty(dataResult) &&
                      !error &&
                      map(dataResult, (v: ProjectListType) => (
                        <ProjectInfoComponent
                          key={v.project_id}
                          project_id={v.project_id}
                          companyName={v.companyName}
                          projectTypeName={v.projectTypeName}
                          date_creation={v.date_creation}
                          comingFrom="project"
                          paymentLink={v.paymentLink}
                          status_value={v.status_value}
                          status_color={v.status_color}
                          status_label={v.status_label}
                          originalProjectId={v.upgradeFromProjectId}
                          invoice={v.invoice}
                          paymentLoader={checkUrlIfPaid()}
                          info={v.info}
                          currentServiceName={
                            v.projectTypeName !== "Ideas generation" ||
                            (v.projectTypeName === "Ideas generation" &&
                              v.currentServiceName === "Idea analysis")
                              ? v.currentServiceName
                              : ""
                          }
                          userRole={props.userRole}
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
                  {(!isEmpty(dataResult) || error) && (
                    <SquareComponent customer={1} />
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

const sql = require("sql-template-strings");
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, optionsAuth);
  if (session && session.user.role === "u") {
    const query = context?.query;
    const id: string = session.user.id;

    // check if user has project
    if (query.project && !isEmpty(query.project)) {
      const checkIfhasProjects: {
        successQuery: boolean;
        data: any;
      } = (await executeQuery(sql`
        select p.project_id from projects p where customer_id = ${id} and project_id=${query.project}
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
    } else {
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
