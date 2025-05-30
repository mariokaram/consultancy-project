// pages/terms-and-conditions.tsx
import React from "react";
import styles from "@/styles/Terms.module.scss";
import { Container, Typography, Box } from "@mui/material";

const TermsAndConditions = () => (
  <Container className={styles.termsPage} maxWidth="md">
    <Typography variant="h4" className={styles.title} gutterBottom>
      Horizon Consultancy Terms &amp; Conditions
    </Typography>
    <Typography variant="subtitle2" className={styles.updatedDate} gutterBottom>
      Last Updated: May 28, 2025
    </Typography>
    <Typography paragraph>
      These Terms of Agreement (“Terms”) govern your access to and use of the
      Horizon Consultancy online platform (the “Website”) and the consultancy
      services provided by Horizon Business Planning Consultancy Inc. (the
      “Firm,” “we,” “us,” or “our”). By accessing the Website or using our
      services (the “Services”), you (the “Client,” “you,” or “your”) agree to
      be bound by these Terms. If you do not agree with any part of these Terms,
      you must not use our Website or engage our Services.
    </Typography>

    <Box className={styles.section}>
      <Typography variant="h6">1. Definitions</Typography>
      <Typography>
        <strong>1.1 Service Bundles:</strong> We offer structured service
        bundles available via our online dashboard. Each bundle comprises
        individual deliverables (“Sections”). Before work on any subsequent
        Section commences, you must review and “Confirm” the deliverable.
      </Typography>
      <ul>
        <li>
          <strong>Bundle 1: Basic Business Plan</strong>
          <ul>
            <li>Business Model (30%)</li>
            <li>Risk &amp; Mitigation (5%)</li>
            <li>Marketing Strategy (25%)</li>
            <li>Management &amp; Organization (5%)</li>
            <li>Financial Projections (30%)</li>
            <li>Growth Strategy (5%)</li>
          </ul>
        </li>
        <li>
          <strong>Bundle 2: Idea &amp; Finance</strong>
          <ul>
            <li>Idea Validation (15%)</li>
            <li>Business Model (45%)</li>
            <li>Financial Analysis (40%)</li>
          </ul>
        </li>
        <li>
          <strong>Bundle 3: Market Study</strong>
          <ul>
            <li>Business Model (45%)</li>
            <li>Lead Generation (15%)</li>
            <li>Competitor Assessment (15%)</li>
            <li>Marketing Plan (25%)</li>
          </ul>
        </li>
        <li>
          <strong>Bundle 4: Idea Generation</strong>
          <ul>
            <li>Idea Proposals (35%)</li>
            <li>Idea Analysis (65%)</li>
          </ul>
        </li>
      </ul>
      <Typography>
        <strong>1.2 Key Terms:</strong>
      </Typography>

      <ul>
        <li>
          <strong>Section:</strong> An individual deliverable within a bundle.
        </li>
        <li>
          <strong>Confirmed:</strong> The status when you have reviewed and
          approved a Section via our online dashboard.
        </li>
        <li>
          <strong>Radical Amendments:</strong> Major changes affecting core
          strategy, target market, or overall direction. Minor changes (e.g.
          formatting or typographical corrections) are not considered radical.
        </li>
      </ul>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">2. Acceptance of Terms</Typography>
      <Typography>
        By using our Website and/or Services, you acknowledge that you have
        read, understood, and agree to these Terms. Your acceptance is indicated
        by registering an account, placing an order, or otherwise engaging our
        Services.
      </Typography>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">3. Scope of Services &amp; Delivery</Typography>
      <Typography>
        <strong>3.1 Service Delivery:</strong> For Bundles 1 to 4, payment is
        required in full upfront prior to commencement of work.
      </Typography>
      <Typography>
        <strong>3.2 Delivery Process:</strong> Our Consultant will deliver work
        Section by Section. Work on any subsequent Section will commence only
        after you have Confirmed the current Section via the online dashboard.
      </Typography>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">4. Payment Terms &amp; Refund Policy</Typography>
      <Typography>
        <strong>4.1 Payment Structure:</strong> Bundles 1–4 require full payment
        in advance. Payments for work are released only after each Section is
        Confirmed.
      </Typography>
      <Typography>
        <strong>4.2 Money-Back Guarantee / Consultant Reassignment:</strong> If
        a Consultant fails to meet agreed standards, you may opt for:
      </Typography>
      <ul>
        <li>
          A refund equal to 100% of the fees paid for the affected Section(s),
          or
        </li>
        <li>Reassignment to a new Consultant at no extra cost.</li>
      </ul>
      <Typography>Triggering conditions include:</Typography>
      <ul>
        <li>Non-responsiveness (failure to reply within 2 working days).</li>
        <li>Non-compliance with the agreed process or milestones.</li>
        <li>
          Unsatisfactory outcomes (errors, omissions, or failure to meet quality
          standards).
        </li>
        <li>
          Delayed responses or untimely delivery without valid justification.
        </li>
      </ul>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">
        5. Deadlines, Delays &amp; Valid Reasons
      </Typography>
      <Typography>
        <strong>5.1 Deadlines:</strong> Each Section shall have mutually agreed
        deadlines. In case of anticipated delays, the Consultant must notify us
        promptly.
      </Typography>
      <Typography>
        <strong>5.2 Penalties for Unjustified Delays:</strong> Unjustified
        delays may result in either the reassignment of the Consultant or
        forfeiture of payment for the affected Section(s).
      </Typography>
      <Typography>
        <strong>5.3 Valid Reasons for Delay:</strong> Delays may be excused if
        notice is provided and a revised timeline agreed upon. Valid reasons
        include:
      </Typography>
      <ul>
        <li>Personal emergencies (e.g. illness, hospitalization).</li>
        <li>
          Force majeure events (e.g. natural disasters, legal restrictions).
        </li>
        <li>
          Client-related delays (e.g. late submission of required information).
        </li>
        <li>Technical failures affecting service delivery.</li>
        <li>Approved scope adjustments.</li>
      </ul>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">6. Amendments &amp; Revision Process</Typography>
      <Typography>
        <strong>6.1 Revision Rights:</strong> You are entitled to two (2) free
        revisions per Section before final confirmation. Please specify required
        changes clearly.
      </Typography>
      <Typography>
        <strong>6.2 Nature of Amendments:</strong>
      </Typography>
      <ul>
        <li>
          Minor Amendments: Formatting adjustments, typographical corrections,
          or slight wording changes.
        </li>
        <li>
          Radical Amendments: Significant changes affecting core aspects of the
          deliverable. Radical amendments will not be accepted after a Section
          is Confirmed unless a new engagement or additional fee is agreed upon.
        </li>
      </ul>
      <Typography>
        <strong>6.3 Execution Responsibility:</strong> Our role is limited to
        planning and advising. The execution of any business plan or strategy
        remains your responsibility.
      </Typography>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">
        7. Consultant Performance, Communication &amp; Recording
      </Typography>
      <ul>
        <li>
          <strong>7.1 Response Time:</strong> Consultants will respond to
          messages via our designated chatroom within 2 working days.
        </li>
        <li>
          <strong>7.2 Performance Standards:</strong> Consultants shall deliver
          work that meets the agreed-upon quality, structure, and industry
          requirements. Failure to do so may activate the Money-Back Guarantee
          provisions.
        </li>
        <li>
          <strong>7.3 Communication Recording:</strong> All communications
          between you and our Consultant—including messages, emails, and chat
          logs exchanged through the Website or designated communication
          platforms—will be recorded and stored by Horizon Consultancy. This
          recording is maintained for quality control, training purposes,
          compliance with applicable laws, and dispute resolution. By using our
          Website and Services, you consent to the recording and retention of
          these communications.
        </li>
      </ul>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">
        8. Consultant&quot;s Right to Halt the Project
      </Typography>
      <Typography>
        A Consultant may suspend or withdraw from a project by providing written
        notice if any of the following occur:
      </Typography>
      <ul>
        <li>
          Client Breach: Failure to provide necessary information or violation
          of agreed terms.
        </li>
        <li>
          Unethical/Illegal Requests: Demands that contravene Canadian law
          (including fraud or misrepresentation).
        </li>
        <li>Hostile Behavior: Harassment, threats, or abusive conduct.</li>
        <li>
          Significant Scope Creep: Unapproved expansion of the project beyond
          agreed parameters.
        </li>
        <li>Force Majeure: External events preventing project continuation.</li>
        <li>Non-Cooperative Client: No response for ten (10) working days.</li>
      </ul>
      <Typography>
        In such cases, you will be billed only for the Sections that have been
        fully completed and Confirmed.
      </Typography>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">
        9. Termination &amp; Cancellation Policy
      </Typography>
      <Typography>
        <strong>9.1 Client-Initiated Termination:</strong> You may terminate or
        cancel your project at any time. However, if such termination is done
        without a valid reason—i.e., reasons that are not consistent with the
        Triggering Conditions outlined in Section 4.2 or without mutual
        agreement—a cancellation fee will apply. Specifically, any Section in
        progress or pending confirmation at the time of termination shall be
        deemed non-refundable. This applies even if the Section has not been
        Confirmed via the online dashboard.
      </Typography>
      <Typography>
        <strong>9.2 Valid Reasons for Termination:</strong> Termination for
        reasons such as Consultant non-responsiveness, non-compliance, or
        unsatisfactory outcomes as defined in Section 4.2 shall be considered
        valid and may be eligible for the refund or reassignment options
        provided therein.
      </Typography>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">10. Confidentiality</Typography>
      <Typography>
        <strong>10.1 Confidential Information:</strong> All information you
        provide and all work produced by our Consultants during the project are
        confidential. You agree not to share, distribute, or use any
        confidential information except for your internal business purposes.
      </Typography>
      <Typography>
        <strong>10.2 Non-Disclosure:</strong> Our Consultants are bound by
        confidentiality agreements and will not disclose your information to
        third parties without your consent, except as required by law.
      </Typography>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">11. Liability &amp; Indemnity</Typography>
      <Typography>
        <strong>11.1 Limitation of Liability:</strong> Horizon Consultancy and
        its Consultants shall not be liable for any indirect, incidental,
        consequential, or punitive damages arising from the use of our Services
        or reliance on deliverables.
      </Typography>
      <Typography>
        <strong>11.2 Indemnity:</strong> You agree to indemnify and hold
        harmless Horizon Consultancy, its employees, and Consultants from any
        claims arising from your misuse of the deliverables or breach of these
        Terms.
      </Typography>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">
        12. Errors &amp; Omissions (E&amp;O) Protection
      </Typography>
      <Typography>
        <strong>12.1</strong> While Horizon Consultancy and its Consultants
        strive to provide accurate, thorough, and professional Services, you
        acknowledge that errors or omissions may occasionally occur. To the
        fullest extent permitted by law, Horizon Consultancy maintains Errors
        &amp; Omissions insurance to cover liabilities arising from negligent
        acts, errors, or omissions in the performance of our Services.
      </Typography>
      <Typography>
        <strong>12.2</strong> Our total liability for any claims arising out of
        or related to the Services shall not exceed the limits of coverage
        provided by our Errors &amp; Omissions insurance policy.
      </Typography>
      <Typography>
        <strong>12.3</strong> This clause does not limit or exclude other
        liability provisions set forth in these Terms.
      </Typography>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">
        13. Governing Law &amp; Dispute Resolution
      </Typography>
      <Typography>
        These Terms shall be governed by and construed in accordance with the
        laws of the Province of Ontario, Canada. Any dispute arising out of or
        relating to these Terms shall be resolved by mediation, and if
        unsuccessful, binding arbitration in Ontario, Canada.
      </Typography>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">14. Miscellaneous</Typography>
      <ul>
        <li>
          <strong>14.1 Amendments:</strong> We may update these Terms from time
          to time. Continued use of our Website or Services constitutes
          acceptance of the updated Terms.
        </li>
        <li>
          <strong>14.2 Severability:</strong> If any provision is found
          unenforceable, the remaining provisions shall remain in full force and
          effect.
        </li>
        <li>
          <strong>14.3 Entire Agreement:</strong> These Terms constitute the
          entire agreement between you and Horizon Consultancy regarding your
          use of our Website and Services.
        </li>
      </ul>
    </Box>

    <Box className={styles.section}>
      <Typography variant="h6">Contact Us</Typography>
      <Typography>
        If you have questions or concerns about these Terms, please contact us
        at:
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

export default TermsAndConditions;
