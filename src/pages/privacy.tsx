import { Container, Typography, Link, Box } from "@mui/material";
import styles from "@/styles/Privacy.module.scss";

export default function PrivacyPolicyPage() {
  return (
    <Container className={styles.privacyContainer} maxWidth="md" sx={{ py: 8 }}>
      {/* Header */}
      <Typography variant="h4" className={styles.title} gutterBottom>
        Horizon Consultancy Privacy Policy
      </Typography>
      <Typography className={styles.updatedDate} gutterBottom>
        Last Updated: May 28, 2025
      </Typography>
      {/* Introduction */}
      <Typography paragraph>
        Horizon Business Planning Consultancy Inc. (“the Firm,” “we,” “us,” or
        “our”) is committed to safeguarding your privacy and maintaining
        transparency regarding how we collect, use, disclose, and protect your
        personal information. This Privacy Policy describes the types of
        information we collect, how we use and store it, and the rights you have
        in relation to your data when you visit our website or engage our
        consultancy services.
      </Typography>

      {/* 1. Information We Collect */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography paragraph>
          We collect information that you provide directly or that is
          automatically collected when you use our services. This includes:
        </Typography>
        <ul>
          <li>
            <strong>Contact & Identification Data:</strong> Full name, email
            address, phone number.
          </li>
          <li>
            <strong>Professional Information:</strong> Your resume and business
            questionnaire responses (e.g., preferences, budget, team size,
            target market).
          </li>
          <li>
            <strong>Authentication Data:</strong> OAuth tokens or email-based
            credentials via NextAuth.
          </li>
          <li>
            <strong>Session Data:</strong> Secure session identifiers stored in
            our database to maintain your login session.
          </li>
          <li>
            <strong>Communication & File Data:</strong> Messages, attachments,
            and files exchanged within our post-payment chatroom.
          </li>
          <li>
            <strong>Usage Data:</strong> Anonymous analytics data collected by
            Google Analytics (e.g., page views, traffic sources) to improve user
            experience.
          </li>
        </ul>
      </Box>

      {/* 2. How We Use Your Information */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography paragraph>We use the information we collect to:</Typography>
        <ul>
          <li>
            Provide, operate, and maintain our consultancy platform and
            services.
          </li>
          <li>
            Authenticate and authorize your access to secure areas of the site.
          </li>
          <li>
            Customize and deliver business planning deliverables based on your
            selected service bundle.
          </li>
          <li>
            Process payments through Stripe; we never store your full payment
            card details.
          </li>
          <li>
            Communicate with you via email and our secure chatroom regarding
            updates and deliverables.
          </li>
          <li>
            Analyze usage patterns via Google Analytics and generate aggregated
            reports to enhance our services.
          </li>
          <li>
            Comply with legal obligations, enforce our Terms of Service, and
            protect against fraud or unauthorized activity.
          </li>
        </ul>
        <Typography>
          We will not use your personal data for unsolicited marketing
          communications unless you have opted in separately.
        </Typography>
      </Box>

      {/* 3. Cookies and Tracking */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          3. Cookies & Tracking Technologies
        </Typography>
        <Typography paragraph>
          We use minimal cookies for essential functionality (e.g., session
          management). We do not deploy cookies for advertising or behavioral
          profiling. Google Analytics may set cookies to collect anonymous usage
          metrics. You can opt out of this tracking by disabling cookies in your
          browser or installing a privacy extension.
        </Typography>
      </Box>

      {/* 4. Payments */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          4. Payments
        </Typography>
        <Typography paragraph>
          Payments for consulting services are processed through{" "}
          <Link
            href="https://stripe.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe
          </Link>
          . We only store transaction references and status; all sensitive
          payment details are handled by Stripe in accordance with PCI DSS
          standards.
        </Typography>
      </Box>

      {/* 5. Data Sharing */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          5. Data Sharing & Disclosures
        </Typography>
        <Typography paragraph>
          We do not sell, trade, or rent your personal data. We may share
          information in the following scenarios:
        </Typography>
        <ul>
          <li>
            <strong>Service Providers:</strong> Trusted third parties who
            perform services on our behalf (e.g., hosting, analytics, payment
            processing) under confidentiality obligations.
          </li>
          <li>
            <strong>Legal Requirements:</strong> When required by law, subpoena,
            or governmental authority.
          </li>
          <li>
            <strong>Protection of Rights:</strong> To enforce our Terms,
            investigate fraud, or protect the safety of our users.
          </li>
        </ul>
      </Box>

      {/* 6. International Transfers */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          6. International Data Transfers
        </Typography>
        <Typography paragraph>
          Our servers are located in Canada and the United States. If you are
          located outside these regions, please be aware that your data may be
          transferred to, processed, and stored there, where data protection
          laws may differ from those in your country. We implement safeguards
          such as encryption to protect your information during transfer.
        </Typography>
      </Box>

      {/* 7. Data Retention */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          7. Data Retention & Deletion
        </Typography>
        <Typography paragraph>
          We retain personal data only for as long as necessary to fulfill the
          purposes outlined herein or as required by law. You may request
          deletion or export of your personal data by contacting us at any time.
          We will authenticate your request and respond within 30 days.
        </Typography>
      </Box>

      {/* 8. Security Measures */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          8. Security Measures
        </Typography>
        <Typography paragraph>
          We employ administrative, technical, and physical safeguards including
          SSL/TLS encryption, firewalls, access controls, and secure database
          encryption to protect against unauthorized access, alteration, or
          destruction of your personal information.
        </Typography>
      </Box>

      {/* 9. Your Rights */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          9. Your Privacy Rights
        </Typography>
        <Typography paragraph>
          Depending on your jurisdiction, you may have rights to:
        </Typography>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Correct or update inaccurate or incomplete data.</li>
          <li>Request deletion of your data or restrict processing.</li>
          <li>
            Object to processing for certain purposes (e.g., legitimate
            interests).
          </li>
          <li>Receive a portable copy of your data in a structured format.</li>
        </ul>
        <Typography>
          To exercise any of these rights, please contact us at
          horizon@horizon-consultancy.com. We will verify your identity and
          respond within 30 days.
        </Typography>
      </Box>

      {/* 10. Children's Privacy */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          10. Children&apos;s Privacy
        </Typography>
        <Typography paragraph>
          Our services are intended for users aged 16 or older. We do not
          knowingly collect personal data from anyone under 16. If we become
          aware that we have collected data from a minor, we will delete it
          promptly.
        </Typography>
      </Box>

      {/* 11. Governing Law */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          11. Governing Law
        </Typography>
        <Typography paragraph>
          This Privacy Policy shall be governed by and construed in accordance
          with the laws of the Province of Ontario and the federal laws of
          Canada, without regard to conflict of law principles.
        </Typography>
      </Box>

      {/* 12. Changes to This Policy */}
      <Box component="section" mb={4}>
        <Typography variant="h6" gutterBottom>
          12. Changes to This Policy
        </Typography>
        <Typography paragraph>
          We may update this Privacy Policy from time to time. Substantive
          changes will be communicated via email or by prominent notice on our
          website prior to the change taking effect.
        </Typography>
      </Box>

      {/* 13. Contact Us */}
      <Box component="section">
        <Typography variant="h6" gutterBottom>
          13. Contact Us
        </Typography>
        <Typography paragraph>
          If you have questions about this Privacy Policy or wish to exercise
          your privacy rights, please contact us at:
        </Typography>
        <ul>
          <li>
            <strong>Email:</strong> horizon@horizon-consultancy.com{" "}
          </li>
          <li>
            <strong>Phone:</strong> +1 (438) 526-2627
          </li>
          <li>
            <strong>Legal Entity:</strong> Horizon Business Planning Consultancy
            Inc.
          </li>
          <li>
            <strong>Address:</strong> 116 Albert Street, Suite 300, K1P 5G3, ON
            Canada
          </li>
        </ul>
      </Box>
    </Container>
  );
}
