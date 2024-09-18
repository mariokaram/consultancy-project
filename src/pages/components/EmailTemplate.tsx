import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailProps {
  link?: string;
  type?: string;
  text?: string;
  heading?: string;
  name?: string;
}

export const TemplateEmail = (template: EmailProps) => {
  return (
    <>
      {template.type === "login" ? (
        <Html>
          <Head />
          <Preview>
            Welcome to Horizon, click on get started to start your project.
          </Preview>
          <Body style={main}>
            <Container style={container}>
              <Img
                src={`https://res.cloudinary.com/dfbxrjdfd/image/upload/v1692953894/sample.jpg`}
                width="170"
                height="50"
                alt="logo horizon"
                style={logo}
              />
              <Text style={paragraph}>Hello future Ceo</Text>
              <Text style={paragraph}>
                Welcome to horizon consultancy bla bla bla
              </Text>
              <Section style={btnContainer}>
                <Button style={button} href={template.link}>
                  Sign in
                </Button>
              </Section>
              <Text style={paragraph}>
                Best,
                <br />
                The Horizon consultancy team
              </Text>
              <Hr style={hr} />
              <Text style={footer}>1355 le corbusier, CA 94402</Text>
            </Container>
          </Body>
        </Html>
      ) : template.type === "contactUs" ? (
        <Html>
          <Head />
          <Preview>
            {template.name || "Someone"} is contacting you from Contact us
          </Preview>
          <Body style={main}>
            <Container style={container}>
              <Img
                src={`https://res.cloudinary.com/dfbxrjdfd/image/upload/v1692953894/sample.jpg`}
                width="170"
                height="50"
                alt="logo horizon"
                style={logo}
              />
              <Text style={paragraph}>
                You have a message from {template.name} and his email is
              </Text>
              <Text style={paragraph}>{template.heading}</Text>
              <Text style={paragraph}>{template.text}</Text>
            </Container>
          </Body>
        </Html>
      ) : (
        <Html>
          <Head />
          <Preview>{template.heading || ""}</Preview>
          <Body style={main}>
            <Container style={container}>
              <Img
                src={`https://res.cloudinary.com/dfbxrjdfd/image/upload/v1692953894/sample.jpg`}
                width="170"
                height="50"
                alt="logo horizon"
                style={logo}
              />
              <Text style={paragraph}>Hello {template.name || ""}</Text>
              <Text style={paragraph}>{template.text || ""}</Text>
              <Section style={btnContainer}>
                <Button style={button} href={template.link}>
                  My dashboard
                </Button>
              </Section>
              <Text style={paragraph}>
                Best,
                <br />
                The Horizon consultancy team
              </Text>
              <Hr style={hr} />
              <Text style={footer}>1355 le corbusier, CA 94402</Text>
            </Container>
          </Body>
        </Html>
      )}
    </>
  );
};

export default TemplateEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#f1a31b",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
