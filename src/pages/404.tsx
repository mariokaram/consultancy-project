import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import styles from "@/styles/404.module.scss";
import SEO from "@/pages/components/SEO";

export default function Custom404() {
  return (
    <>
      <SEO noIndex={true} />
      <Container className={styles.container}>
        <Typography variant="h1" className={styles.title}>
          404
        </Typography>
        <Typography variant="h5" className={styles.subtitle}>
          Oops! The page you are looking for does not exist.
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
