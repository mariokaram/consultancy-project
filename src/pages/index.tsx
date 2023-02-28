import styles from "@/styles/Home.module.scss";
import Button from "@material-ui/core/Button";
import { configs } from "@/utils/config";
import Link from "next/link";
import useSWR from "swr";
import logger from "@/utils/logger";
export default function Home() {
  const { data, error, isValidating } = useSWR(`/api/hello`, {
    revalidateOnFocus: false,
  });
  // logger.info("hey babe");
  return (
    <>
      <section>
        <div>
          <Button
            className={`mario ${styles.main}`}
            onClick={()=>logger.error("")}
          >
            asdasd
          </Button>

          <Link passHref href="/">
            <Button className={`mario ${styles.main}`}>asdasd</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
