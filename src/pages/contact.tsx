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
import { configs } from "@/utils/config";
import SEO from "@/pages/components/SEO";

export default function ContactUsPage() {
  const { showSpinner } = useContext(SpinnerContext);

  const [formValues, setFormValues] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxLength = 50;

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
        toast.error(
          `Please enter at least ${maxLength} characters so we can assist you.`
        );
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
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact - Horizon Consultancy",
    "description": "Contact Horizon Consultancy for business inquiries, strategic advice, and partnership opportunities.",
    "url": "https://www.horizon-consultancy.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Horizon Consultancy",
      "url": "https://www.horizon-consultancy.com",
      "logo": "https://res.cloudinary.com/dfbxrjdfd/image/upload/v1740534946/logo-primary_jeideq.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-438-526-2627",
        "contactType": "Customer Service",
        "areaServed": "CA",
        "availableLanguage": ["English", "French"]
      }
    }
  };

  return (
    <>
      <SEO
        title="Contact - Horizon Consultancy"
        description="Have questions or want to review a mock-up plan? Contact Horizon Consultancy for inquiries, collaborations, or partnership opportunities."
        url={`${configs.PUBLIC_URL}/contact`}
        structuredData={contactSchema}
      />
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
                Feel free to reach out to us anytime if you have any questions
                or would like to review a mock-up plan for better understanding.
                If you&apos;re interested in proposing a partnership, we welcome the
                opportunity to collaborate and look forward to hearing from you.
              </div>
              <div className={styles.infoContact}>
                <div>
                  <div className={styles.infoIcon}>
                    <EmailIcon />
                  </div>
                  <div className={styles.infoName}>
                    <div>email us</div>
                    <div>horizon@horizon-consultancy.com</div>
                  </div>
                </div>
                <div>
                  <div className={styles.infoIcon}>
                    <LocationOnIcon />
                  </div>
                  <div className={styles.infoName}>
                    <div>Location</div>
                    <div>116 Albert Street, Suite 300, K1P 5G3, ON Canada</div>
                  </div>
                </div>
                <div>
                  <div className={styles.infoIcon}>
                    <CallIcon />
                  </div>
                  <div className={styles.infoName}>
                    <div>Call us</div>
                    <div>+1 (438) 526-2627</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`card ${styles.cardContact}`}>
              <div className={`subTitle ${styles.subtitle}`}>Contact Us</div>
              <div className={`description ${styles.desc}`}>
                We will make sure to get back to you within one to two working
                days.
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
                    style={{ fontSize: "1rem" }}
                    onChange={handleMessageChange}
                    rows={7}
                  ></textarea>
                  <div className={styles.charCount}>
                    {charCount > maxLength
                      ? ""
                      : `${charCount}/${maxLength} minimum characters`}
                  </div>
                </div>
              </div>
              <div className={styles.btnSbmt}>
                <Button
                  size="large"
                  className="btn btn-secondary"
                  onClick={() => submit()}
                >
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
