import styles from "@/styles/Contact.module.scss";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import backGroundImage from "~/public/imgs/contactBg.webp";
import { SpinnerContext } from "@/contexts/SpinnerContextProvider";
import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import Button from "@mui/material/Button";
import { insertLogs } from "@/utils/shared";
import axios from "axios";

export default function ContactUsPage() {
  const { showSpinner } = useContext(SpinnerContext);

  const [formValues, setFormValues] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxLength = 150;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    setMessage(value);
    setCharCount(value.length);
  }

  async function submit(): Promise<void> {
    try {
      // Validation checks
      if (formValues.name.trim() === "") {
        toast.error("Name is required");
        return;
      }

      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)
      ) {
        toast.error("Invalid email");
        return;
      }

      if (message.trim() === "" || message.length < maxLength) {
        toast.error("Message must be at least 150 characters");
        return;
      }

      // If all fields are valid
      showSpinner(true);

      const params = {
        email: formValues.email,
        name: formValues.name,
        message,
      };
      const res: {
        data: {
          success?: boolean;
          message?: string;
        };
      } = await axios.post("/api/contact", params);

      if (!res.data.success) {
        throw `problem with api contact : ${res.data?.message} `;
      } else {
        toast.success("Message sent successfully!");
        setFormValues({ name: "", email: "" });
        setMessage("");
      }
    } catch (error: any) {
      toast.error("Something went wrong, please try again later");
      insertLogs("client", "submit", "contact", error?.message || error);
    } finally {
      showSpinner(false);
    }
  }

  return (
    <>
      <section>
        <div className={styles.contactContainer}>
          <Image
            alt="background-contact"
            src={backGroundImage}
            fill
            quality={100}
            priority={true}
            className={styles.img}
          />
          <div className={styles.contactForm}>
            <div className={styles.contactInfoSection}>
              <div className={`subTitle ${styles.infoTitle}`}>Get in touch</div>
              <div className={styles.infoDesc}>
                We're here to assist you with any inquiries or questions you may
                have. Please feel free to reach out to us using the contact
                information below, and we'll get back to you as soon as
                possible.
              </div>
              <div className={styles.infoContact}>
                <div>
                  <div className={styles.infoIcon}>
                    <EmailIcon />
                  </div>
                  <div className={styles.infoName}>
                    <div>email us</div>
                    <div>horizon@hotmail.cop</div>
                  </div>
                </div>
                <div>
                  <div className={styles.infoIcon}>
                    <LocationOnIcon />
                  </div>
                  <div className={styles.infoName}>
                    <div>Location</div>
                    <div>234 Boulevard Maine , ON Canada</div>
                  </div>
                </div>
                <div>
                  <div className={styles.infoIcon}>
                    <CallIcon />
                  </div>
                  <div className={styles.infoName}>
                    <div>Call us</div>
                    <div>1 (438) 343-4545</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`card ${styles.cardContact}`}>
              <div className={`subTitle ${styles.subtitle}`}>Contact Us</div>
              <div className={`description ${styles.desc}`}>
                Send us a message and will respond as soon as possible
              </div>

              <div className={styles.inputSection}>
                <div className={styles.bio}>
                  <div>
                    <TextField
                      size="small"
                      label="Name"
                      name="name"
                      fullWidth
                      type="text"
                      value={formValues.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <TextField
                      size="small"
                      label="Email"
                      name="email"
                      fullWidth
                      type="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className={styles.msg}>
                  <textarea
                    placeholder="Your message"
                    value={message}
                    onChange={handleMessageChange}
                    rows={7}
                  ></textarea>
                  <div className={styles.charCount}>
                    {charCount > maxLength
                      ? ""
                      : `${charCount}/${maxLength} characters`}
                  </div>
                </div>
              </div>
              <div className={styles.btnSbmt}>
                <Button className="btn btn-secondary" onClick={() => submit()}>
                  Send message
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
