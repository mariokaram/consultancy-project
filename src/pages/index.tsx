import styles from "@/styles/Home.module.scss";
import Button from "@mui/material/Button";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import backGroundImage from "~/public/imgs/landing-background.jpg";
import aboutImg from "~/public/imgs/about.png";
import arrowRight from "~/public/icons/arrow-right.svg";
import listPen from "~/public/icons/list-pen.svg";
import handPen from "~/public/icons/hand-pen.svg";
import useSWR from "swr";
import { useState } from "react";
export default function Home() {
  const [btnSelected, selectBtn] = useState("first");
  const howItWorks: any = {
    first: [
      "Register",
      "Fill a questionnaire",
      "Get your answers reviewed",
      "Go through checkout",
      "Get your consultant assigned",
      "Chat with your consultant",
    ],
    second: [
      "Register Idea",
      "Fill a questionnaire Idea",
      "Get your answers reviewed Idea",
      "Go through checkout Idea",
      "Get your consultant assigned Idea",
      "Chat with your consultant Idea",
    ],
  };
  const settings: any = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: false,
  };
  const testimonials: any = [
    {
      photo: "profile1",
      name: "Mario Karam",
      job: "CEO - Acteos SARL",
      desc: "You could even ask influencers to write a blog post for their own website that reviews your product or services, plus the tips they learned through working with you. This gets your business in front of even more readers and prospective target clients.",
    },
    {
      photo: "profile2",
      name: "Nour Dfouni",
      job: "CEO - Horizon SARL",
      desc: "You could even ask influenc usiness in front of even more readers and prospective target clients.",
    },
    {
      photo: "profile3",
      name: "George Semaan",
      job: "Steward - Mehen SARL",
      desc: "You could even ask influencers to ed through working with you. This gets your business in front of even more readers and prospective target clients.",
    },
    {
      photo: "profile4",
      name: "Mario Karam",
      job: "CEO - Acteos SARL",
      desc: "You could even ask influencers to write a blog post for their own website that reviews your product or services, plus the tips they learned through working with you. This gets your business in front of even more readers and prospective target clients.",
    },
  ];
  const { data, error, isValidating } = useSWR("/api/hello", {
    revalidateOnFocus: false,
  });
  return (
    <>
      <section>
        <div className={styles.backgroundImg}>
          <div className={styles.image}>
            <Image
              height={586}
              width={1440}
              alt="background"
              src={backGroundImage}
              quality={100}
              priority={true}
            />
            <div className={styles.info}>
              <div className="title">Consulting Agency</div>
              <div className="subTitle">Endless Ideas</div>
              <div className={styles.description}>
                Our studied prices are clearly stated in the bundles with no
                hidden fees. These bundles cater for the needs of entrepreneurs
                in any industry and any location.
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <div className={styles.infoSmall}>
            <div className={styles.description}>
              Our studied prices are clearly stated in the bundles with no
              hidden fees. These bundles cater for the needs of entrepreneurs in
              any industry and any location.
            </div>
          </div>
        </div> */}

        <div className={styles.mainContainer}>
          {/* about us section  */}
          <div className={styles.aboutUsContainer}>
            <div className={styles.aboutImg}>
              <Image
                alt="aboutus"
                src={aboutImg}
                quality={100}
                priority={true}
              />
            </div>
            <div className={styles.aboutInfo}>
              <div className="title">about you</div>
              <div className="subTitle">
                Run your business with
                <br />
                confidence
              </div>
              <div className="description">
                Our consultants&apos; experience and knowledge guide you through
                the process of becoming a successful entrepreneur.
                <br />
                <br />
                Working with us allows you to:
              </div>
              <div className={styles.aboutPoints}>
                <div className={styles.aboutMini}>
                  <div>
                    <Image alt="arrow" src={arrowRight} />
                    <span>Alleviate uncertainty</span>
                  </div>
                  <div>
                    <Image alt="arrow" src={arrowRight} />
                    <span>Focus on your own skills</span>
                  </div>
                  <div>
                    <Image alt="arrow" src={arrowRight} />
                    <span>Follow an executive plan</span>
                  </div>
                </div>
                <div className={styles.aboutMini}>
                  <div>
                    <Image alt="arrow" src={arrowRight} />
                    <span>Maintain your business</span>
                  </div>
                  <div>
                    <Image alt="arrow" src={arrowRight} />
                    <span>Acquire investment</span>
                  </div>
                  <div>
                    <Image alt="arrow" src={arrowRight} />
                    <span>Obtain mentorship</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* our service section  */}
          <div className={styles.servicesContainer}>
            <div className={styles.serviceInfo}>
              <div className="title">Our services</div>
              <div className="subTitle">
                Ensure your highest
                <br />
                chance of success
              </div>
              <div className="description">
                Creativity and innovation are at the heart of our company. When
                we craft plans and proposals for <br />
                you we make sure you stand out in the market. We keep you at the
                center at all times.
              </div>
              <br />
            </div>

            <div className={styles.cardsContainer}>
              <div className="card">
                <div>
                  <Image alt="handpen" src={handPen} />
                </div>
                <div className={styles.cardTitle}>Business Plan</div>
                <div className={styles.cardText}>
                  Our business plan analytically covers all aspects of a
                  startup. It is an all-inclusive roadmap that guides you even
                  after the launch. It also entails all the information
                  investors look for.
                </div>
                <div className={styles.cardBtn}>
                  <Link className="transitionLink" href="/" passHref>
                    <Button className="links no-hover-background">
                      Explore
                      <span className={styles.cardArrow}>
                        <Image alt="arrow" src={arrowRight} />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="card">
                <div>
                  <Image alt="listPen" src={listPen} />
                </div>
                <div className={styles.cardTitle}>Idea Generation</div>
                <div className={styles.cardText}>
                  Based on our original “Business idea questionnaire” your
                  answers will help us propose ideas that are uniquely suitable
                  for you. The report is based on an in depth critical analysis
                  of your experience.
                </div>
                <div className={styles.cardBtn}>
                  <Link className="transitionLink" href="/" passHref>
                    <Button className="links no-hover-background">
                      Explore
                      <span className={styles.cardArrow}>
                        <Image alt="arrow" src={arrowRight} />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* why us section */}
          <div className={styles.whyUsContainer}>
            <div className={styles.whyUsInfo}>
              <div className="title">Why us</div>
              <div className="subTitle">
                Explore possibilities and opportunities
              </div>
              <div className="description">
                Simply put, we are a result driven company, we want you to
                succeed even after
                <br />
                your project is finalized. We also use a top-notch process that
                makes the entire
                <br />
                experience clear, easy and trackable.
              </div>
              <br />
            </div>

            <div className={styles.coloredCardsContainer}>
              <div className={`${styles.colored} card`}>
                <div className={styles.cardTitle}>Idea research and study</div>
                <div className={styles.cardDesc}>
                  To validate your idea we make sure we fully understand it in
                  context. The collected data enables us to either move forward
                  or propose amendments.
                </div>
              </div>
              <div className={`${styles.colored} card`}>
                <div className={styles.cardTitle}>
                  Custom-made business model
                </div>
                <div className={styles.cardDesc}>
                  Instead of adopting a head-on with competitors business model
                  we provide you with one that favorably differentiates yours
                  from theirs.
                </div>
              </div>
              <div className={`${styles.colored} card`}>
                <div className={styles.cardTitle}>Executive plan</div>
                <div className={styles.cardDesc}>
                  Business plans need to be coupled with practical and
                  executable roadmaps. The executive plan transforms the full
                  study into action based steps.
                </div>
              </div>
            </div>

            <div className={styles.coloredCardsContainer}>
              <div className={`${styles.colored} card`}>
                <div className={styles.cardTitle}>Responsive foundation</div>
                <div className={styles.cardDesc}>
                  “Putting a company on track” is no longer a viable statement
                  as markets and needs have become ever-changing. We address
                  that by creating flexible and adaptable plans.
                </div>
              </div>
              <div className={`${styles.colored} card`}>
                <div className={styles.cardTitle}>Mentorship</div>
                <div className={styles.cardDesc}>
                  As we care about your full entrepreneurial journey we teamed
                  up with mentorship platforms. This means that when the project
                  is done you will still have, if need be, guidance and support.
                </div>
              </div>
              <div className={`${styles.colored} card`}>
                <div className={styles.cardTitle}>Personal development</div>
                <div className={styles.cardDesc}>
                  Our services are pronouncedly based on your future success as
                  well as the launching of your company. We strive to give
                  entrepreneurs the right tools to adapt and grow in the market.
                </div>
              </div>
            </div>
          </div>

          {/* how it works */}
          <div className={styles.howItWorksContainer}>
            <div className={styles.title}>How It Works</div>
            <div className={styles.desc}>
              All of the processes on our website have been carefully
              <br />
              studied to make it easy for you to navigate through them.
            </div>

            <div className={styles.btnSec}>
              <div
                className={
                  btnSelected === "second" ? styles.activeBtnL : styles.zIndex
                }
              >
                <Button
                  className="btn btn-secondary"
                  onClick={() => selectBtn("first")}
                >
                  Business plan
                </Button>
              </div>
              <div
                className={
                  btnSelected === "first" ? styles.activeBtnR : styles.zIndex
                }
              >
                <Button
                  className="btn btn-secondary"
                  onClick={() => selectBtn("second")}
                >
                  Idea generation
                </Button>
              </div>
            </div>
            <div className={styles.phases}>
              {howItWorks[btnSelected].map((v: string, i: number) => (
                <div key={i} data-text={v}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* testimonials section */}
          <div className={styles.testimonialSection}>
            <div className={styles.testimonialInfo}>
              <div className="title">Testimonials</div>
              <div className="subTitle">What Clients Said</div>
            </div>

            <div className={styles.profileSection}>
              <Slider {...settings}>
                {testimonials.map((v: any) => (
                  <div
                    key={v.photo}
                    className={`${styles.profile} ${styles[v.photo]} card`}
                  >
                    <div className={styles.info}>
                      <div className={styles.text}>{v.desc}</div>
                      <div className={styles.name}>{v.name}</div>
                      <div className={styles.job}>{v.job}</div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
