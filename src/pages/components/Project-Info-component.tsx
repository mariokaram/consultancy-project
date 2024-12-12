import * as React from "react";
import moment from "moment";
import Image from "next/image";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/router";
import Info from "~/public/imgs/info.png";
import styles from "@/styles/ProjectInfo.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";

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

      case "Financial plan":
      case "f":
        return "financial-plan";

      case "Marketing plan":
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
      <div className={styles.infoBanner}>
        <div>
          <Image quality={100} src={Info} alt="infoBanner" />
        </div>
        <div className={styles.infoText}>
          <div className={styles.infoTitle}>
            <InfoIcon />
            <span>Info</span>
          </div>
          <div>
            {isNaN(info as number)
              ? info
              : `Estimating time is around ${info} business days`}
          </div>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardTitle}>
          <div className={styles.companyName}>{companyName}</div>
          {userRole === "a" && (
            <div>
              User Id: <strong>{userId}</strong>{" "}
            </div>
          )}
          {(userRole === "a" || userRole === "c") && (
            <>
              <div>
                User name: <strong>{userName}</strong>{" "}
              </div>
              <div>
                User email: <strong>{userEmail}</strong>{" "}
              </div>
            </>
          )}
          <div>
            Project id: <strong>{project_id}</strong>
          </div>
          <div>
            Service plan:{" "}
            <strong style={{ textTransform: "capitalize" }}>
              {projectTypeName}
            </strong>
          </div>
          <div>
            Created on:{" "}
            <strong>{moment.utc(date_creation).format("DD-MM-YYYY")}</strong>
          </div>
          <div className={styles.btnCards}>
            {openProjectDetails && comingFrom === "project" && (
              <div>
                <Button
                  size="large"
                  onClick={() => openProjectDetails(project_id)}
                  className="btn btn-secondary"
                >
                  View Project Overview
                </Button>
              </div>
            )}
            <div>
              {comingFrom === "details" && (
                <Button
                  size="large"
                  className="btn btn-secondary"
                  onClick={() => {
                    if (userRole === "a" || userRole === "c") {
                      return router.push(`/consultant/dashboard-consultant`);
                    } else {
                      router.push(`/dashboard`);
                    }
                  }}
                >
                  <ArrowBackIcon />
                  Back
                </Button>
              )}
            </div>

            {!originalProjectId && (
              <div>
                <Button
                  className="btn btn-third"
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
          </div>
        </div>
        <div className={styles.statusInfo}>
          {consultantName ? (
            <div>
              Assigned to <strong>{consultantName}</strong>
            </div>
          ) : (
            <div>Consultant not assigned yet</div>
          )}
          <div className={styles.status}>
            <div className={status_color}>{status_label}</div>
            {invoice && (
              <div className={styles.statusName}>{currentServiceName}</div>
            )}
          </div>
          <div>
            {(userRole === "a" || userRole === "u") && invoice && (
              <div>
                <a href={invoice}>
                  <Button size="large" className="btn btn-primary">
                    <DownloadIcon
                      fontSize="small"
                      style={{ marginRight: ".2rem" }}
                    />
                    My invoice
                  </Button>
                </a>
              </div>
            )}
            {(userRole === "u" || userRole === "a") &&
              paymentLoader &&
              status_value === "awaitingPayment" &&
              !invoice && (
                <CircularProgress
                  style={{ color: "var(--blueColor)" }}
                  size={20}
                ></CircularProgress>
              )}
            {(userRole === "u" || userRole === "a") &&
              !invoice &&
              !paymentLoader &&
              status_value === "awaitingPayment" &&
              paymentLink && (
                <div>
                  <Button
                    size="large"
                    onClick={() => router.replace(`${paymentLink}`)}
                    className="btn btn-primary"
                  >
                    Proceed to Payment
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
