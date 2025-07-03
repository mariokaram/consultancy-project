import * as React from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/router";
import styles from "@/styles/ProjectInfo.module.scss";
import DownloadIcon from "@mui/icons-material/Download";

interface ProjectInfoProps {
  project_id: number;
  companyName: string;
  date_creation: Date | null;
  status_value: string;
  status_color: string;
  status_label: string;
  userRole: string;
  userName?: string;
  userEmail?: string;
  paymentLink: string;
  userId?: string;
  currentServiceName: string;
  info: string | number;
  invoice: string;
  paymentLoader?: boolean;
  consultantName: string;
  originalProjectId: number;
  projectTypeName: string;
  comingFrom: string;
  openProjectDetails?: (id: number) => void;
}

const ProjectInfoComponent: React.FC<ProjectInfoProps> = ({
  project_id,
  companyName,
  projectTypeName,
  date_creation,
  status_value,
  paymentLink,
  invoice,
  status_color,
  status_label,
  originalProjectId,
  currentServiceName,
  userRole,
  paymentLoader,
  userName,
  userEmail,
  userId,
  info,
  consultantName,
  comingFrom,
  openProjectDetails,
}) => {
  const router = useRouter();

  function formatQuestionaireType(serviceName: string): string {
    switch (serviceName) {
      case "Ideas generation":
      case "i":
        return "ideas-generation";

      case "Business plan":
      case "b":
        return "business-plan";

      case "Idea & Finance":
      case "f":
        return "financial-plan";

      case "Market strategy":
      case "m":
        return "marketing-plan";

      case "Complex business plan":
      case "bc":
        return "complex-business-plan";

      default:
        return "";
    }
  }
  return (
    <div className={styles.projects}>
      <div className={styles.cardInfo}>
        <div className={styles.cardTitle}>
          <div className={styles.companyName}>{companyName}</div>
          <div className={styles.consul}>
            Consultant:{" "}
            {consultantName ? (
              <strong>{consultantName} </strong>
            ) : (
              <strong>Not assigned yet</strong>
            )}
          </div>
          {userRole === "a" && (
            <>
              <div>
                User Id: <strong>{userId}</strong>{" "}
              </div>
              <div>
                Project Id: <strong>{project_id}</strong>{" "}
              </div>
            </>
          )}
          {(userRole === "a" || userRole === "c") && (
            <>
              <div className={styles.bio}>
                User name: <strong>{userName}</strong>{" "}
              </div>
              <div className={styles.bio}>
                User email: <strong>{userEmail}</strong>{" "}
              </div>
            </>
          )}
          <div className={styles.consul}>
            Service plan:{" "}
            <strong style={{ textTransform: "capitalize" }}>
              {projectTypeName}
            </strong>
          </div>
          <div>
            Started on:{" "}
            <strong>{moment.utc(date_creation).format("DD-MM-YYYY")}</strong>
          </div>
          {invoice && currentServiceName && (
            <div className={styles.serviceName}>
              Current stage: <strong>{currentServiceName}</strong>
            </div>
          )}
          <div className={styles.status}>
            <div className={status_color}>
              {status_value === "underReview" &&
              projectTypeName === "Ideas generation"
                ? "Reviewing answers"
                : status_label}
            </div>
          </div>

          {status_value !== "complete" && (
            <div className={styles.infoTxt}>
              <InfoIcon />
              {isNaN(info as number) ? (
                <div>{info}</div>
              ) : (
                <div>
                  {projectTypeName === "Ideas generation" &&
                  currentServiceName !== "Idea analysis"
                    ? `We are currently developing two business ideas based on your answers. This process may take up to ${info} business days.`
                    : `The process is expected to be completed within ${info} business days.`}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.statusInfo}>
          <div className={styles.btnCards}>
            {openProjectDetails && comingFrom === "project" && (
              <div style={{ order: "2" }}>
                <Button
                  size="large"
                  onClick={() => openProjectDetails(project_id)}
                  className={
                    status_value !== "notSubmitted" &&
                    status_value !== "awaitingPayment"
                      ? "btn btn-secondary"
                      : "btn btn-whitish"
                  }
                >
                  View Project Overview
                </Button>
              </div>
            )}
            {comingFrom === "details" && (
              <div
                style={{
                  order: "3",
                }}
              >
                <Button
                  size="large"
                  className={
                    status_value === "complete" ||
                    status_value === "proccess" ||
                    status_value === "underReview"
                      ? "btn btn-secondary"
                      : "btn btn-whitish"
                  }
                  onClick={() => {
                    if (userRole === "a" || userRole === "c") {
                      return router.push(`/consultant/dashboard-consultant`);
                    } else {
                      router.push(`/dashboard`);
                    }
                  }}
                >
                  Back to dashboard
                </Button>
              </div>
            )}

            {!originalProjectId && (
              <div
                style={{ order: status_value !== "notSubmitted" ? "3" : "1" }}
              >
                <Button
                  className={
                    status_value !== "notSubmitted"
                      ? "btn btn-whitish"
                      : "btn btn-secondary"
                  }
                  size="large"
                  onClick={() => {
                    if (userRole === "a" || userRole === "c") {
                      return router.push(
                        `/questionnaire?service=${formatQuestionaireType(
                          projectTypeName
                        )}&project=${project_id}&userId=${userId}`
                      );
                    } else {
                      router.push(
                        `/questionnaire?service=${formatQuestionaireType(
                          projectTypeName
                        )}&project=${project_id}`
                      );
                    }
                  }}
                >
                  {status_value !== "notSubmitted"
                    ? "Review Questionnaire"
                    : "Complete Questionnaire"}
                </Button>
              </div>
            )}
            {(userRole === "a" || userRole === "u") && invoice && (
              <div style={{ order: "3" }}>
                <a href={invoice}>
                  <Button size="large" className="btn btn-whitish">
                    <DownloadIcon
                      fontSize="small"
                      style={{ marginRight: ".2rem" }}
                    />
                    Download invoice
                  </Button>
                </a>
              </div>
            )}

            {/* {(userRole === "u" || userRole === "a") &&
              paymentLoader &&
              status_value === "awaitingPayment" &&
              !invoice && (
                <CircularProgress
                  style={{ color: "var(--blueColor)" }}
                  size={20}
                ></CircularProgress>
              )} */}
            {(userRole === "u" || userRole === "a") &&
              !invoice &&
              !paymentLoader &&
              status_value === "awaitingPayment" &&
              paymentLink && (
                <div style={{ order: "1" }}>
                  <Button
                    size="large"
                    onClick={() => router.replace(`${paymentLink}`)}
                    className="btn btn-secondary"
                  >
                    Proceed to payment
                  </Button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoComponent;
