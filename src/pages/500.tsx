import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import styles from "@/styles/404.module.scss";
import SEO from "@/pages/components/SEO";

export default function Custom500() {
  return (
    <>
      <SEO noIndex={true} />
      <Container className={styles.container}>
        <Typography variant="h1" className={styles.title}>
          :(
        </Typography>
        <Typography variant="h5" className={styles.subtitle}>
          Something went wrong. Please try again later.
        </Typography>
        <Link href="/">
          <Button size="large" className="btn btn-third">
            Go Back Home
          </Button>
        </Link>
      </Container>
    </>
  );
}
