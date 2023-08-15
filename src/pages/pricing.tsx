import styles from "@/styles/Pricing.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/pricing-image.png";
import tick from "~/public/icons/tick.svg";
import redirect from "~/public/icons/redirect.svg";
import ContactBanner from "./components/Contact-Banner";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import Button from "@mui/material/Button";
import CustomizedAccordions from "./components/Accordion-component";

export default function PricingPage() {
  const mediaQuery = useMediaQuery("(max-width:1000px)");
  const mediaQuery14 = useMediaQuery("(max-width:1400px)");
  const mediaQuery6 = useMediaQuery("(max-width:600px)");
  return (
    <>
      <section>
        {/* backGroundImage Section */}
        <div className={styles.backgroundImg}>
          <div className={styles.image}>
            <div className={styles.info}>
              <div className="title">Pricing</div>
              <div className="subTitle">Choose a Service Plan</div>
              <div className={`${styles.desc} description`}>
                Horizon consultancy offers you all-inclusive and in-depth
                studies that are guaranteed to put your business journey on the
                right track.
              </div>
              <div className={styles.packages}>
                <div className={styles.pckContainer}>
                  <div className={styles.pckg}>
                    <div className={styles.title}>financial plan</div>
                    <div className={styles.readMore}>
                      <Link href="/services/business-plan" passHref>
                        <Button>
                          Read more
                          <span className={styles.cardArrow}>
                            <Image alt="redirect" src={redirect} />
                          </span>
                        </Button>
                      </Link>
                    </div>
                    <div className={styles.price}>$1500</div>
                    <div className={styles.list}>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>2 to 3 idea suggesti ds dsd ssdsons</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>Expert consultad sd sdsnt</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>Personalized analysd sd sis</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>Business model el ds sd sments</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>
                          Open workroom directly ds dsds on sdsd lezim,
                          sdfdsfthis platform
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.chooseBtn}>
                    <Link
                      passHref
                      href={{
                        pathname: "/questionnaire",
                        query: { service: "financial-plan", project: "new" },
                      }}
                    >
                      <Button className="btn btn-secondary">Choose</Button>
                    </Link>
                  </div>
                </div>
                <div className={styles.pckContainer}>
                  <div className={styles.pckg}>
                    <div className={styles.title}>marketing</div>
                    <div className={styles.readMore}>
                      <Link href="/services/business-plan" passHref>
                        <Button>
                          Read more
                          <span className={styles.cardArrow}>
                            <Image alt="redirect" src={redirect} />
                          </span>
                        </Button>
                      </Link>
                    </div>
                    <div className={styles.price}>$2500</div>
                    <div className={styles.list}>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>2 to 3 idea suggestions</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>Expert consultant</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>Personalized analysis</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>Business model elements</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>Open workroom directly on this platform</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.chooseBtn}>
                    <Link
                      passHref
                      href={{
                        pathname: "/questionnaire",
                        query: { service: "marketing-plan", project: "new" },
                      }}
                    >
                      <Button className="btn btn-secondary">Choose</Button>
                    </Link>
                  </div>
                </div>
                <div className="card">
                  <div
                    className={styles.pckContainer}
                    style={{ padding: 0, height: "100%" }}
                  >
                    <div className={styles.pckg}>
                      <div className={styles.title}>business plan</div>
                      <div className={styles.readMore}>
                        <Link href="/services/business-plan" passHref>
                          <Button>
                            Read more
                            <span className={styles.cardArrow}>
                              <Image alt="redirect" src={redirect} />
                            </span>
                          </Button>
                        </Link>
                      </div>
                      <div className={styles.price}>$4000</div>
                      <div className={styles.list}>
                        <div>
                          <Image alt="arrow" src={tick} />
                          <span>some ide ato share</span>
                        </div>
                        <div>
                          <Image alt="arrow" src={tick} />
                          <span>hake ktir lexzim nghayro</span>
                        </div>
                        <div>
                          <Image alt="arrow" src={tick} />
                          <span>Personalized analysis</span>
                        </div>
                        <div>
                          <Image alt="arrow" src={tick} />
                          <span>Business model elements</span>
                        </div>
                        <div>
                          <Image alt="arrow" src={tick} />
                          <span>
                            Open workroom directly on this plapen workroom
                            directly on this plapen workroom directly on this
                            platform
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.chooseBtn}>
                      <Link
                        passHref
                        href={{
                          pathname: "/questionnaire",
                          query: { service: "business-plan", project: "new" },
                        }}
                      >
                        <Button className="btn btn-secondary">Choose</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.pckContainer}>
                  <div className={styles.pckg}>
                    <div className={styles.title}>idea generation</div>
                    <div className={styles.readMore}>
                      <Link href="/services/proposing-business-ideas" passHref>
                        <Button>
                          Read more
                          <span className={styles.cardArrow}>
                            <Image alt="redirect" src={redirect} />
                          </span>
                        </Button>
                      </Link>
                    </div>
                    <div className={styles.price}>$1500</div>
                    <div className={styles.list}>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>2 to 3 idea suggestions</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>Expert consultant</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>Personalized analysis</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>Business model elements</span>
                      </div>
                      <div>
                        <Image alt="arrow" src={tick} />
                        <span>Open workroom directly on this platform</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.chooseBtn}>
                    <Link
                      passHref
                      href={{
                        pathname: "/questionnaire",
                        query: { service: "ideas-generation", project: "new" },
                      }}
                    >
                      <Button className="btn btn-secondary">Choose</Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={`${styles.complex} card`}>
                <div className={styles.infoContainer}>
                  <div>
                    <div className={styles.title}>Complex business plan</div>
                    <div className={`${styles.descComplex} description`}>
                      You might need a different quotation if your business
                      meets some of these criteria.
                    </div>
                  </div>

                  <div className={styles.btnComplex}>
                    <Link
                      passHref
                      href={{
                        pathname: "/questionnaire",
                        query: { service: "complex-business-plan", project: "new" },
                      }}
                    >
                      <Button className="btn btn-secondary">Get started</Button>
                    </Link>
                  </div>
                </div>
                <div className={styles.arrowSection}>
                  <div className={styles.arrowsComplex}>
                    <div>
                      <Image alt="arrow" src={tick} />
                      <span>More than 1 business model</span>
                    </div>
                    <div>
                      <Image alt="arrow" src={tick} />
                      <span>Budget higher than $400,000</span>
                    </div>
                  </div>
                  <div className={styles.arrowsComplex}>
                    <div>
                      <Image alt="arrow" src={tick} />
                      <span>Intricate operations/processes</span>
                    </div>
                    <div>
                      <Image alt="arrow" src={tick} />
                      <span>Medium to large sized enterprise</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mainContainer}>
          {/* faq Section */}
          <div className={styles.faqSection}>
            <div className="title">faq</div>
            <div className="subTitle">How can we help you?</div>

            <div className={styles.accordion}>
              <CustomizedAccordions />
            </div>
          </div>

          {/* contact section */}
          <div className={styles.contactSection}>
            <ContactBanner />
          </div>
        </div>
      </section>
    </>
  );
}
