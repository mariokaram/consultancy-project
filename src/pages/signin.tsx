import styles from "@/styles/Signin.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import backGroundImage from "~/public/imgs/signin-img.webp";
import Logo from "~/public/icons/logo-primary.svg";
import googleIcon from "~/public/icons/googleicon.svg";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { SpinnerContext } from "@/contexts/SpinnerContextProvider";
import { insertLogs } from "@/utils/shared";
import { useState, useContext, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { configs } from "@/utils/config";
import SEO from "@/pages/components/SEO";

export default function LoginInPage() {
  const { showSpinner } = useContext(SpinnerContext);

  const [email, setInput] = useState("");
  const router = useRouter();
  function emailChange(value: string) {
    setInput(value);
  }

  useEffect(() => {
    if (router.query.error) {
      if (router.query.error === "OAuthAccountNotLinked") {
        toast.error(
          "You already have an account linked to this gmail, try to signin via email instead."
        );
      } else {
        toast.error("Something went wrong, please try again later");
      }
      insertLogs(
        "client",
        "signInwWithGoogle",
        "signin",
        router.query.error as string
      );
    }
  }, [router.query.error]);

  async function submit(e: HTMLFormElement) {
    try {
      e.preventDefault();
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        showSpinner(true);
        await signIn("email", {
          email,
          callbackUrl: configs.webUrl,
        });
      } else {
        toast.error("Invalid email");
      }
    } catch (error: any) {
      toast.error("Something went wrong, please try again later");
      insertLogs(
        "client",
        "submit",
        "signin",
        "error from email submit:" + router.query.error
      );
    } finally {
      showSpinner(false);
    }
  }
  return (
    <>
      <SEO
        title="Signin - Horizon Consultancy"
        description="Horizon Consultancy provides Signin."
        url={`${configs.PUBLIC_URL}/signin`}
      />
      <section>
        <div className={styles.signInContainer}>
          <Image
            alt="background-signin"
            src={backGroundImage}
            quality={100}
            fill
            priority={true}
            className={styles.img}
          />
          <div className={styles.loginForm}>
            <div className={`card ${styles.cardLogin}`}>
              <div className={styles.logo}>
                <Image alt="logo-signin" priority height={35} src={Logo} />
              </div>
              <div className={`subTitle ${styles.subtitle}`}>Sign in</div>
              <div className="description">
                Welcome! Let&apos;s get started.
              </div>
              <form onSubmit={(e: any) => submit(e)}>
                <div className={styles.input}>
                  <TextField
                    variant="standard"
                    size="small"
                    label="Email"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e: any) => emailChange(e.target.value)}
                  />
                </div>

                <div className={styles.btnlogin}>
                  <Button
                    type="submit"
                    size="large"
                    fullWidth
                    className="btn btn-secondary"
                  >
                    Sign in
                  </Button>
                  <div className={styles.notice}>
                    <AutoFixHighIcon />
                    <div>
                      You will receive a verification email with a secure
                      sign-in link.
                    </div>
                  </div>
                </div>
              </form>

              <div className={styles.loginSeperated}>
                <hr className={styles.leftHr} />
                <div>OR</div>
                <hr className={styles.rightHr} />
              </div>
              <div>
                <Button
                  onClick={() => signIn("google")}
                  variant="contained"
                  size="large"
                  startIcon={
                    <Image
                      alt="google"
                      src={googleIcon}
                      height={20}
                      width={20}
                    />
                  }
                  fullWidth
                  className={styles.googleBtn}
                >
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </section>
    </>
  );
}

import { GetServerSidePropsContext } from "next";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, optionsAuth);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
