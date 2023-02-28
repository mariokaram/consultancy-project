import styles from "@/styles/Home.module.scss";
import Button from "@mui/material/Button";

import { configs } from "@/utils/config";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data, error, isValidating } = useSWR(`/api/hello`, {
    revalidateOnFocus: false,
  });
  return (
    <>
      <section>
        <div>
          <Button className={`mario ${styles.main}`}>asdasd</Button>

          <Link passHref href="/">
            <Button className={`mario ${styles.main}`}>asdasd</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
