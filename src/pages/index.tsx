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
            priority={true}
          />
          <div className={styles.textOverlay}>
            <div className={styles.subtitle}>consulting Agency</div>
            <h1 className={styles.title}>
              Realize your ambitions with expert guidance and amazing results
            </h1>
            <div className={styles.desc}>
              Our advanced processes will guarantee you a seamless business
              launch with vivid messaging and standout communications.
            </div>
            <div>
              <Link href="/dashboard">
                <Button size="large" className="btn btn-secondary">
                  Access dashboard
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
                  Our seasoned experts will help you smoothly navigate the
                  challenging path to launching your new company. We ensure you
                  fully understand each phase of the process, equipping you with
                  the knowledge needed to successfully launch and sustain your
                  business with confidence. Embrace Independence: Forge Your
                  Path with Us! We can help you:
                </div>

                <div className={styles.ticks}>
                  <div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Minimize uncertainty</span>
                    </div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Focus on your skills</span>
                    </div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Acquire investment</span>
                    </div>
                  </div>

                  <div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Gain relevant knowledge</span>
                    </div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Autonomously run your firm</span>
                    </div>
                    <div>
                      <Image alt="tick" width={22} height={16} src={tick} />
                      <span>Expand in the right direction</span>
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
                  <div className={styles.link}>Business Plan</div>
                  <div>
                    Our Business Plan template is a detailed roadmap designed to
                    guide your startup in any industry from conception through
                    launch and beyond. It covers every essential aspect of your
                    business, offering a comprehensive and easy-to-follow
                    strategy.
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
                  <div className={styles.link}>Idea Generation</div>
                  <div>
                    We can propose innovative ideas that align perfectly with
                    your capabilities and aspirations. Our approach involves
                    conducting a thorough analysis of your background, skills,
                    and preferences so we can analyze and propose ideas that
                    suit you.
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
            <h2 className="subTitle">Turning visions into reality</h2>
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
                <div className={styles.title}>Idea validation</div>
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
                <div className={styles.title}>Tailored business model</div>
                <div className={styles.desc}>
                  We provide an adaptive business model that distinguishes your
                  venture from competitors, even in a competitive market.
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
                <div className={styles.title}>Practical plan</div>
                <div className={styles.desc}>
                  When creating the business plan structure our aim is to
                  develop a plan that is actionable and grounded in real-world
                  implementation rather than being purely theoretical.
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
                  In an ever-changing market our approach involves crafting
                  versatile and adjustable strategies to predict and navigate
                  ongoing changes effectively.
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
                <div className={styles.title}>Customer support</div>
                <div className={styles.desc}>
                  You can count on our comprehensive project processes and
                  dedicated follow-up to ensure your satisfaction and provide
                  the highest level of service and support.
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
                <div className={styles.title}>Relevant business know-how</div>
                <div className={styles.desc}>
                  We aim to assist you in launching and sustaining your business
                  by providing practical insights. We can help you avoid
                  unnecessary courses and workshops.
                </div>
              </div>
            </div>
          </div>
          {/* how it works */}
          <div className={styles.howItWorksContainer}>
            <h2 className={styles.title}>How It Works</h2>
            <div className={styles.desc}>
              We have thoroughly analyzed all processes on our website to ensure
              they are user-friendly and easy for you to navigate.
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
