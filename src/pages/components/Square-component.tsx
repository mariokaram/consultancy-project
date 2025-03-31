import * as React from "react";
import Button from "@mui/material/Button";
import styles from "@/styles/Square.module.scss";
import Image from "next/image";
import customerservice from "~/public/imgs/customerservice.png";
import chat from "~/public/imgs/chat.png";
import meeting from "~/public/imgs/meeting.png";
import Link from "next/link";
import { configs } from "@/utils/config";

interface SquareComponentProps {
  chatroom?: number;
  customer: number;
  schedule?: number;
  projectId?: number;
  isPaid?: boolean;
}

interface SquareData {
  id: string;
  order: number;
  component: JSX.Element;
}

export default function SquareComponent({
  chatroom,
  customer,
  schedule,
  projectId,
  isPaid,
}: SquareComponentProps) {
  // Create an array to hold the squares and their order
  const components: SquareData[] = [];

  // Conditionally push the customer square
  if (customer) {
    components.push({
      id: "customer",
      order: customer,
      component: (
        <div className={styles.square} key="customer">
          <Image src={customerservice} priority alt="customerService" />
          <div className={styles.imgContent}>
            <div className={styles.title}>Customer Service</div>
            <div className={`${styles.squareDesc}`}>
              This is the customer support contact, where you can address any
              concerns or inquire about the process at any time.
            </div>
            <div>
              <Link href="/contact">
                <Button size="large" className="btn btn-white">
                  Contact us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ),
    });
  }
  // Conditionally push the schedule square
  if (schedule) {
    components.push({
      id: "schedule",
      order: schedule,
      component: (
        <div className={styles.square} key="schedule">
          <Image src={meeting} priority alt="scheduleService" />
          <div className={styles.imgContent}>
            <div className={styles.title}>Schedule a meeting</div>
            <div className={`${styles.squareDesc}`}>
              Some text here describing schedule meeting.
            </div>
            <div>
              <Link
                href={{ pathname: configs.NEXT_PUBLIC_BOOKING }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="large" className="btn btn-white">
                  Schedule a meeting
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ),
    });
  }

  // Conditionally push the chatroom square
  if (chatroom) {
    components.push({
      id: "chatroom",
      order: chatroom,
      component: (
        <div className={styles.square} key="chatroom">
          <Image quality={100} src={chat} priority alt="chatroom" />
          <div className={styles.imgContent}>
            <div className={styles.title}>Chatroom</div>
            <div className={`${styles.squareDesc}`}>
              In this chatroom, you can exchange documents, discuss various
              sections of plans, and schedule meetings with your consultant.
            </div>
            <div>
              {isPaid ? (
                <Link href={{ pathname: "/chatroom", query: { projectId } }}>
                  <Button size="large" className="btn btn-white">
                    Chat with consultant
                  </Button>
                </Link>
              ) : (
                <Button size="large" className="btn btn-white" disabled>
                  Chat with consultant
                </Button>
              )}
            </div>
          </div>
        </div>
      ),
    });
  }

  // Sort components based on their `order`
  const sortedComponents = components.sort((a, b) => a.order - b.order);

  return (
    <div className={styles.rightSide}>
      {sortedComponents.map((square) => square.component)}
    </div>
  );
}
