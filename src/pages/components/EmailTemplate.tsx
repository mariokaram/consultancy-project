import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
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
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>
          {template.type === "login"
            ? "Sign in to your account to begin your business journey."
            : template.heading ||
              "You've got an update from Horizon Consultancy"}
        </Preview>

        <Body className="bg-gray-100 text-base font-sans">
          <Container className="bg-white p-6 shadow-md rounded-md mx-auto max-w-lg border border-gray-200">
            {/* Logo */}
            <Section className="text-center mb-6">
              <Img
                src={baseUrl}
                width="150"
                height="40"
                alt="Horizon Consultancy Logo"
                className="mx-auto"
              />
            </Section>

            {/* Heading */}
            <Heading className="text-center text-xl font-bold text-gray-800 mb-2">
              {template.type === "login"
                ? "Welcome to Horizon Consultancy"
                : template.heading || "Message from Horizon"}
            </Heading>

            {/* Sub-content */}
            {template.type === "login" ? (
              <>
                <Text className="text-center text-gray-700 mb-4">
                  Hello, future founder,
                </Text>
                <Text className="text-gray-700 mb-4 text-center">
                  Use the button below to securely sign in to your account and
                  continue building your business with us.
                </Text>

                <Section className="text-center mb-6">
                  <Button
                    href={template.link}
                    className="bg-[#028b9c] text-white px-6 py-3 rounded-md font-semibold hover:opacity-90"
                  >
                    Get Started
                  </Button>
                </Section>

                <Text className="text-xs text-center text-gray-500">
                  If you did not request this email, you can safely ignore it.
                </Text>
              </>
            ) : template.type === "contactUs" ? (
              <>
                <Text className="text-gray-700 mb-2">
                  You&apos;ve received a new inquiry from{" "}
                  {template.name || "a visitor"}.
                </Text>
                <Text className="text-gray-700 mb-2 font-semibold">
                  Subject: {template.heading}
                </Text>
                <Text className="text-gray-700 whitespace-pre-line">
                  {template.text}
                </Text>
              </>
            ) : (
              <>
                <Text
                  className="text-gray-700 mb-2"
                  style={{ textTransform: "capitalize" }}
                >
                  Hello {template.name || "there"},
                </Text>
                <Text className="text-gray-700 mb-4 whitespace-pre-line">
                  {template.text ||
                    "Here's the latest from Horizon Consultancy."}
                </Text>

                {template.link && (
                  <Section className="text-center mb-6">
                    <Button
                      href={template.link}
                      className="bg-[#028b9c] text-white px-5 py-2 rounded-md font-semibold hover:opacity-90"
                    >
                      View Dashboard
                    </Button>
                  </Section>
                )}
              </>
            )}

            {/* Signature */}
            <Text className="text-gray-700 mt-8 text-center">
              Best regards,
              <br />
              <strong>The Horizon Consultancy Team</strong>
            </Text>

            {/* Divider */}
            <Section className="border-t border-gray-200 my-6"></Section>

            {/* Footer */}
            <Text className="text-xs text-gray-500 text-center leading-relaxed">
              &copy; {currentYear} Horizon Business Planning Consultancy Inc.
              <br />
              116 Albert Street, Suite 300, K1P 5G3, ON Canada
              <br />
              <Link
                href="https://horizon-consultancy.com/privacy"
                className="text-blue-600 underline"
              >
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link
                href="https://horizon-consultancy.com/terms"
                className="text-blue-600 underline"
              >
                Terms And Conditions
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TemplateEmail;
