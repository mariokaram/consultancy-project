// import * as React from "react";
// import {
//   Body,
//   Button,
//   Container,
//   Head,
//   Hr,
//   Html,
//   Img,
//   Preview,
//   Section,
//   Text,
// } from "@react-email/components";

// interface EmailProps {
//   link?: string;
//   type?: string;
//   text?: string;
//   heading?: string;
//   name?: string;
// }

// export const TemplateEmail = (template: EmailProps) => {
//   return (
//     <>
//       {template.type === "login" ? (
//         <Html>
//           <Head />
//           <Preview>
//             Welcome to Horizon, click on get started to start your project.
//           </Preview>
//           <Body style={main}>
//             <Container style={container}>
//               <Img
//                 src={`https://res.cloudinary.com/dfbxrjdfd/image/upload/v1692953894/sample.jpg`}
//                 width="170"
//                 height="50"
//                 alt="logo horizon"
//                 style={logo}
//               />
//               <Text style={paragraph}>Hello future Ceo</Text>
//               <Text style={paragraph}>
//                 Welcome to horizon consultancy bla bla bla
//               </Text>
//               <Section style={btnContainer}>
//                 <Button style={button} href={template.link}>
//                   Sign in
//                 </Button>
//               </Section>
//               <Text style={paragraph}>
//                 Best,
//                 <br />
//                 The Horizon consultancy team
//               </Text>
//               <Hr style={hr} />
//               <Text style={footer}>1355 le corbusier, CA 94402</Text>
//             </Container>
//           </Body>
//         </Html>
//       ) : template.type === "contactUs" ? (
//         <Html>
//           <Head />
//           <Preview>
//             {template.name || "Someone"} is contacting you from Contact us
//           </Preview>
//           <Body style={main}>
//             <Container style={container}>
//               <Img
//                 src={`https://res.cloudinary.com/dfbxrjdfd/image/upload/v1692953894/sample.jpg`}
//                 width="170"
//                 height="50"
//                 alt="logo horizon"
//                 style={logo}
//               />
//               <Text style={paragraph}>
//                 You have a message from {template.name} and his email is
//               </Text>
//               <Text style={paragraph}>{template.heading}</Text>
//               <Text style={paragraph}>{template.text}</Text>
//             </Container>
//           </Body>
//         </Html>
//       ) : (
//         <Html>
//           <Head />
//           <Preview>{template.heading || ""}</Preview>
//           <Body style={main}>
//             <Container style={container}>
//               <Img
//                 src={`https://res.cloudinary.com/dfbxrjdfd/image/upload/v1692953894/sample.jpg`}
//                 width="170"
//                 height="50"
//                 alt="logo horizon"
//                 style={logo}
//               />
//               <Text style={paragraph}>Hello {template.name || ""}</Text>
//               <Text style={paragraph}>{template.text || ""}</Text>
//               <Section style={btnContainer}>
//                 <Button style={button} href={template.link}>
//                   My dashboard
//                 </Button>
//               </Section>
//               <Text style={paragraph}>
//                 Best,
//                 <br />
//                 The Horizon consultancy team
//               </Text>
//               <Hr style={hr} />
//               <Text style={footer}>1355 le corbusier, CA 94402</Text>
//             </Container>
//           </Body>
//         </Html>
//       )}
//     </>
//   );
// };

// export default TemplateEmail;

// const main = {
//   backgroundColor: "#ffffff",
//   fontFamily:
//     '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
// };

// const container = {
//   margin: "0 auto",
//   padding: "20px 0 48px",
// };

// const logo = {
//   margin: "0 auto",
// };

// const paragraph = {
//   fontSize: "16px",
//   lineHeight: "26px",
// };

// const btnContainer = {
//   textAlign: "center" as const,
// };

// const button = {
//   backgroundColor: "#f1a31b",
//   borderRadius: "3px",
//   color: "#fff",
//   fontSize: "16px",
//   textDecoration: "none",
//   textAlign: "center" as const,
//   display: "block",
// };

// const hr = {
//   borderColor: "#cccccc",
//   margin: "20px 0",
// };

// const footer = {
//   color: "#8898aa",
//   fontSize: "12px",
// };

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import type * as React from "react";

interface EmailProps {
  link?: string;
  type?: string;
  text?: string;
  heading?: string;
  name?: string;
}

const baseUrl =
  "https://res.cloudinary.com/dfbxrjdfd/image/upload/v1740534946/logo-primary_jeideq.png";

export const TemplateEmail = (template: EmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>
          {template.type === "login"
            ? "Welcome to Horizon, click on Get Started to start your project."
            : template.heading || ""}
        </Preview>
        <Body className="bg-gray-100 text-base font-sans">
          <Container className="bg-white p-6 shadow-md rounded-md mx-auto max-w-lg">
            <Img
              src={`${baseUrl}`}
              width="170"
              height="50"
              alt="Horizon Logo"
              className="mx-auto my-4"
            />
            <Heading
              className="text-center text-lg font-semibold my-4"
              style={{ color: "#5a627c" }}
            >
              {template.type === "login"
                ? "Welcome to Horizon"
                : template.heading}
            </Heading>

            {template.type === "login" ? (
              <>
                <Text className="text-gray-700 text-center">
                  Hello future CEO,
                </Text>
                <Text className="text-gray-700 text-center">
                  Welcome to Horizon Consultancy. Click below to sign in and
                  start your journey.
                </Text>
                <Section className="text-center my-4">
                  <Button
                    className="bg-blue-500 text-white px-6 py-3 rounded-md"
                    href={template.link}
                  >
                    Sign in
                  </Button>
                </Section>
              </>
            ) : template.type === "contactUs" ? (
              <>
                <Text className="text-gray-700">
                  You have a message from {template.name || "Someone"}.
                </Text>
                <Text className="text-gray-700">{template.heading}</Text>
                <Text className="text-gray-700">{template.text}</Text>
              </>
            ) : (
              <>
                <Text className="text-gray-700">
                  Hello {template.name || ""},
                </Text>
                <Text className="text-gray-700">{template.text || ""}</Text>
                <Section className="text-center my-4">
                  <Button
                    className="font-bold text-white bg-[#028b9c] px-[11px] py-[8px] rounded-[4px]"
                    href={template.link}
                  >
                    My Dashboard
                  </Button>
                </Section>
              </>
            )}

            <Text className="text-gray-500 text-center mt-6">
              Best,
              <br /> The Horizon Consultancy Team
            </Text>
            <Text className="text-gray-400 text-center text-sm mt-4">
              1355 Le Corbusier, CA 94402
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TemplateEmail;
