import { useState } from "react";
import styles from "@/styles/Home.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import ContactBanner from "@/pages/components/Contact-Banner";
import Button from "@mui/material/Button";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";

import backGroundImage from "~/public/imgs/landing-background.webp";
import ambitionWork from "~/public/imgs/ambitionWork.webp";
import successWork from "~/public/imgs/successWork.webp";
import businessPlan from "~/public/imgs/businessPlan.webp";
import bulb from "~/public/imgs/bulb.webp";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import solution from "~/public/icons/solution.svg";
import development from "~/public/icons/development.svg";
import data from "~/public/icons/data.svg";
import contentmanagement from "~/public/icons/content-management.svg";
import consultation from "~/public/icons/consultation.svg";
import businessmodel from "~/public/icons/business-model.svg";
import talking from "~/public/icons/talking.svg";
import fill from "~/public/icons/fill.svg";
import search from "~/public/icons/search.svg";
import checkout from "~/public/icons/checkout.svg";
import redirect from "~/public/icons/redirect.svg";
import consultant from "~/public/icons/consultant.svg";
import contactform from "~/public/icons/contact-form.svg";
import tick from "~/public/icons/tick.svg";

export default function Home() {
  type HowItWorksKeys = "business" | "idea";
  type HowItWorksStep = {
    text: string;
    img: string;
  };
  const [btnSelected, selectBtn] = useState<HowItWorksKeys>("business");
  const howItWorks: Record<HowItWorksKeys, HowItWorksStep[]> = {
    business: [
      { text: "Register", img: contactform },
      { text: "Fill a questionnaire", img: fill },
      { text: "Get your answers reviewed", img: search },
      { text: "Go through checkout", img: checkout },
      { text: "Get your consultant assigned", img: consultant },
      { text: "Chat with your consultant", img: talking },
    ],
    idea: [
      { text: "Register Idea", img: contactform },
      { text: "Fill a questionnaire Idea", img: fill },
      { text: "Get your answers reviewed Idea", img: search },
      { text: "Go through checkout Idea", img: checkout },
      { text: "Get your consultant assigned Idea", img: consultant },
      { text: "Chat with your consultant Idea", img: talking },
    ],
  };

  const settings: any = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
  };
  const testimonials: any = [
    {
      photo: "profile1",
      name: "Mario Karam",
      job: "Acteos SARL",
      url: "https://facebook.com",
      desc: "You could even ask influencers to write a blog post for their own website that reviews your product or services, plus the tips they learned through working with you. This gets your business in front of even more readers and prospective target clients.",
    },
    {
      photo: "profile2",
      name: "Nour Dfouni",
      job: "Horizon SARL",
      url: "https://facebook.com",
      desc: "You could even ask influenc usiness in front of even more readers and prospective target clients.",
    },
    {
      photo: "profile3",
      name: "George Semaan",
      job: "Mehen SARL",
      url: "https://facebook.com",
      desc: "You could even ask influencers to ed through working with you. This gets your business in front of even more readers and prospective target clients.",
    },
    {
      photo: "profile4",
      name: "Mario Karam",
      job: "Acteos SARL",
      url: "https://facebook.com",
      desc: "You could even ask influencers to write a blog post for their own website that reviews your product or services, plus the tips they learned through working with you. This gets your business in front of even more readers and prospective target clients.",
    },
  ];

  const mediaQuery1400 = useMediaQuery("(max-width:1400px)");

  return (
    <>
      <section>
        <div className={styles.backgroundImg}>
          <Image
            src={backGroundImage}
            alt="Hero Image"
            quality={100}
            priority
          />
          <div className={styles.textOverlay}>
            <div className={styles.subtitle}>consulting Agency</div>
            <h1 className={styles.title}>
              Elevate Your Business Vision with Cutting-Edge Consulting
            </h1>
            <div className={styles.desc}>
              Intuitive online process meets expert guidance to transform your
              entrepreneurial journey.
            </div>
            <div>
              <Link href="/dashboard">
                <Button size="large" className="btn btn-secondary">
                  Experience the Project Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.mainContainer}>
          {/* about us section  */}
          <div className={styles.aboutUsContainer}>
            <h6 className="title">About you</h6>
            <h2 className="subTitle">Run your business with confidence</h2>

            {mediaQuery1400 ? (
              <div className={styles.imgRespSect}>
                <div className={styles.imgResp}>
                  <Image
                    width={260}
                    height={290}
                    src={successWork}
                    alt="successPic"
                  ></Image>
                </div>
                <div className={styles.imgResp2}>
                  <Image
                    width={260}
                    height={290}
                    src={ambitionWork}
                    alt="ambitionPic"
                  ></Image>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className={styles.aboutDescription}>
              <div className={styles.imageLeft}>
                <Image src={successWork} alt="successPic"></Image>
              </div>
              <div className={styles.aboutText}>
                <div>
                  Embarking on the journey of entrepreneurship can be daunting,
                  but with our seasoned consultants by your side, you can
                  navigate this path with confidence. Our team brings a wealth
                  of experience and knowledge to the table, guiding you through
                  5 lines
                </div>

                <div className={styles.ticks}>
                  <div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Alleviate uncertainty</span>
                    </div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Focus on your own skills</span>
                    </div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Follow an executive plan</span>
                    </div>
                  </div>

                  <div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Maintain your business</span>
                    </div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Acquire investment</span>
                    </div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Obtain mentorship</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Link href="/pricing">
                    <Button size="large" className="btn btn-secondary">
                      Get started
                    </Button>
                  </Link>
                </div>
              </div>
              <div className={styles.imageRight}>
                <Image src={ambitionWork} alt="ambitionPic"></Image>
              </div>
            </div>
          </div>
          {/* our service section  */}
          <div className={styles.servicesContainer}>
            <h6 className="title">Our services</h6>
            <h2 className="subTitle">Ensure your highest chance of success</h2>
            <div className="description">
              Creativity and innovation are at the heart of our company. When we
              craft plans and proposals for you we make sure you stand out in
              the market. We keep you at the center at all times.
            </div>

            <div className={styles.services}>
              <div className={styles.businessPlan}>
                <div className={`${styles.rectangular} ${styles.lightBlue} `}>
                  <div>
                    <Link href="/services/business-plan" passHref>
                      <div className={styles.link}>
                        Business Plan <ReadMoreIcon className={styles.icon} />
                      </div>
                    </Link>
                  </div>
                  <div>
                    Our business plan analytically covers all aspects of a
                    startup. It is an all-inclusive roadmap that guides you even
                    after the launch. It also entails all the information
                    investors look for.
                  </div>
                </div>
                <div>
                  <Image
                    width={556}
                    height={437}
                    src={businessPlan}
                    alt="businessPlan"
                    quality={100}
                  ></Image>
                </div>
              </div>
              <div className={styles.ideaGen}>
                <div>
                  <Image
                    quality={100}
                    width={556}
                    height={437}
                    src={bulb}
                    alt="bulb"
                  ></Image>
                </div>
                <div className={`${styles.rectangular} ${styles.blue} `}>
                  <div>
                    <Link href="/services/proposing-business-ideas">
                      <div className={styles.link}>
                        Idea Generation <ReadMoreIcon className={styles.icon} />
                      </div>
                    </Link>
                  </div>
                  <div>
                    Based on our original “Business idea questionnaire” your
                    answers will help us propose ideas that are uniquely
                    suitable for you. The report is based on an in depth
                    critical analysis of your experience and preferences.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.btnService}>
              <Link href="/services">
                <Button size="large" className="btn btn-secondary">
                  learn more about services
                </Button>
              </Link>
            </div>
          </div>
          {/* why us section */}
          <div className={styles.whyUsContainer}>
            <h6 className="title">Why us</h6>
            <h2 className="subTitle">
              Explore possibilities and opportunities
            </h2>
            <div className="description">
              Simply put, we are a result driven company, we want you to succeed
              even after your project is finalized. We also use a top-notch
              process that makes the entire experience clear, easy and
              trackable.
            </div>

            <div className={styles.upperFeatures}>
              <div className={styles.whyUsSection}>
                <div className={styles.icon}>
                  <Image
                    width={51}
                    height={59}
                    src={solution}
                    alt="solution"
                  ></Image>
                </div>
                <div className={styles.title}>Idea research and study</div>
                <div className={styles.desc}>
                  To validate your idea we make sure we fully understand it in
                  context. The collected data enables us to either move forward
                  or propose amendments.
                </div>
              </div>
              <div className={styles.whyUsSection}>
                <div className={styles.icon}>
                  <Image
                    width={51}
                    height={59}
                    src={businessmodel}
                    alt="businessmodel"
                  ></Image>
                </div>
                <div className={styles.title}>Custom-made business model</div>
                <div className={styles.desc}>
                  Instead of adopting a head-on with competitors business model
                  we provide you with one that favorably differentiates yours
                  from theirs.
                </div>
              </div>
              <div className={`${styles.whyUsSection} ${styles.noBorder} `}>
                <div className={styles.icon}>
                  <Image
                    width={51}
                    height={59}
                    src={contentmanagement}
                    alt="contentmanagement"
                  ></Image>
                </div>
                <div className={styles.title}>Executive plan</div>
                <div className={styles.desc}>
                  Business plans need to be coupled with practical and
                  executable roadmaps. The executive plan transforms the full
                  study into action based steps.
                </div>
              </div>
            </div>
            <div className={styles.bottomFeatures}>
              <div className={styles.whyUsSection}>
                <div className={styles.icon}>
                  <Image width={51} height={59} src={data} alt="data"></Image>
                </div>
                <div className={styles.title}>Responsive foundation</div>
                <div className={styles.desc}>
                  To validate your idea we make sure we fully understand it in
                  context. The collected data enables us to either move forward
                  or propose amendments.
                </div>
              </div>

              <div className={styles.whyUsSection}>
                <div className={styles.icon}>
                  <Image
                    width={51}
                    height={59}
                    src={consultation}
                    alt="consultation"
                  ></Image>
                </div>
                <div className={styles.title}>Mentorship</div>
                <div className={styles.desc}>
                  As we care about your full entrepreneurial journey we teamed
                  up with mentorship platforms. This means that when the project
                  is done you will still have, if need be, guidance and support.
                </div>
              </div>
              <div className={`${styles.whyUsSection} ${styles.noBorder} `}>
                <div className={styles.icon}>
                  <Image
                    width={51}
                    height={59}
                    src={development}
                    alt="development"
                  ></Image>
                </div>
                <div className={styles.title}>Personal development</div>
                <div className={styles.desc}>
                  Our services are pronouncedly based on your future success as
                  well as the launching of your company. We strive to give
                  entrepreneurs the right tools to adapt and grow in the market.
                </div>
              </div>
            </div>
          </div>
          {/* how it works */}
          <div className={styles.howItWorksContainer}>
            <h2 className={styles.title}>How It Works</h2>
            <div className={styles.desc}>
              All of the processes on our website have been carefully studied to
              make it easy for you to navigate through them.
            </div>

            <div className={styles.btnSec}>
              <div className={btnSelected === "idea" ? styles.unActive : ""}>
                <Button
                  className={styles.howitWorkBtn}
                  onClick={() => selectBtn("business")}
                >
                  Business Plan
                </Button>
              </div>
              <div
                className={btnSelected === "business" ? styles.unActive : ""}
              >
                <Button
                  className={styles.howitWorkBtn}
                  onClick={() => selectBtn("idea")}
                >
                  Idea Generation
                </Button>
              </div>
            </div>
            <div className={styles.timelineContainer}>
              <ul className={styles.timeline}>
                {howItWorks[btnSelected].map((step, i) => (
                  <li key={i} className={styles.timelineStep}>
                    <div className={styles.icon}>
                      <Image
                        width={37}
                        height={46}
                        src={step.img}
                        alt={step.text}
                      />
                    </div>
                    <div className={styles.stepNumber}>Step {i + 1}</div>
                    <div className={styles.line}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.label}>{step.text}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.videoWrapper}>
              <div className={styles.videoContainer}>
                <iframe
                  src="https://www.youtube.com/embed/HMN3xsvAMSg"
                  title="how it works"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          {/* testimonials section */}
          <div className={styles.testimonialSection}>
            <div className={styles.testimonialInfo}>
              <h6 className="title">Testimonials</h6>
              <h2 className="subTitle">What Clients Said</h2>
            </div>

            <div className={styles.profileSection}>
              <Slider
                {...settings}
                slidesToScroll={mediaQuery1400 ? 1 : 3}
                slidesToShow={mediaQuery1400 ? 1 : 3}
              >
                {testimonials.map((v: any) => (
                  <div
                    key={v.photo}
                    className={`${styles.profile} ${styles[v.photo]} card`}
                  >
                    <div className={styles.info}>
                      <div className={styles.name}>{v.name}</div>
                      <div className={styles.job}>
                        <div>{v.job}</div>
                        <div>
                          <a
                            href={v.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={redirect}
                              height={13}
                              width={13}
                              alt="redirect"
                            />
                          </a>
                        </div>
                      </div>

                      <div className={styles.text}>&quot;{v.desc}&quot;</div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          {/* contact section */}
          <div className={styles.contactus}>
            <ContactBanner />
          </div>
        </div>
      </section>
    </>
  );
}
