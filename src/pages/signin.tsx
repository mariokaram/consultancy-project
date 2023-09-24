import styles from "@/styles/Signin.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Image from "next/image";
import backGroundImage from "~/public/imgs/signin-img.jpg";
import Logo from "~/public/icons/logo-primary.svg";
import googleIcon from "~/public/icons/googleicon.svg";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useState } from "react";
export default function LoginInPage({ csrfToken }: any) {
  const [email, setInput] = useState("mariokaram257@gmail.com");

  function emailChange(value: string) {
    setInput(value);
  }

  // TODO  spinner on login
  // TODO  Remove all backrgound image and use IMAGE/next js
  // TODO  check email error and catch error
  // TODO  FIX logout on header
  // TODO  chaNGE callbackurl
  // TODO  google provider
  // TODO  fix 500 and 404 error page
  async function submit(e: HTMLFormElement) {
    try {
      e.preventDefault();
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        const result = await signIn("email", {
          email,
          callbackUrl: "http://localhost:3000",
        });
        console.log(result);
      } else {
        console.log("wrong email");
      }
    } catch (error: any) {
      insertLogs("client", "submit", "signin", error.message);
    }
  }
  return (
    <>
      <section>
        <div className={styles.signInContainer}>
          <Image
            alt="background"
            src={backGroundImage}
            quality={100}
            fill
            priority={true}
            className={styles.img}
          />
          <div className={styles.loginForm}>
            <div className="card">
              <div className={styles.logo}>
                <Image alt="logo" src={Logo} />
              </div>
              <div className={`subTitle ${styles.subtitle}`}>Sign in</div>
              <div className="description">
                We are glad to help you and introduce you to our services.
              </div>
              <form method="post" onSubmit={(e: any) => submit(e)}>
                <div className={styles.input}>
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
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
                  <Button type="submit" fullWidth className="btn btn-secondary">
                    Sign in
                  </Button>
                  <div className={styles.notice}>
                    <AutoFixHighIcon />
                    <div>
                      We will email you a magic code for a password-free sign
                      in.
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
                  variant="contained"
                  startIcon={
                    <Image
                      alt="google"
                      src={googleIcon}
                      height={25}
                      width={25}
                    />
                  }
                  fullWidth
                  className="btn btn-white"
                >
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { getCsrfToken, signIn } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { insertLogs } from "@/utils/shared";

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
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
