import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    sx={{ padding: "0 !important" }}
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", color: "var(--blueColor)" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  color: "var(--primaryColor)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{ fontWeight: 500 }}>
            What exactly does Horizon Consultancy do, and who is it for?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Horizon Consultancy partners with entrepreneurs and businesses to
            guide them—whether they are launching, refining (identifying and
            solving problems), or validating ideas. We offer tailored services
            to turn concepts into sustainable businesses ready to meet market
            demands.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography style={{ fontWeight: 500 }}>
            How do I know which package is right for my needs?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontSize: "1.05rem" }}>
            • <b>Idea Generation:</b> You need fresh, personalized business
            ideas aligned with your skills and goals.
            <br />• <b>Idea & Finance:</b> You have an idea and need validation
            plus a feasibility study to determine financial viability and
            capital requirements.
            <br />• <b>Market Strategy:</b> You have a business model and want
            to refine your positioning, attract leads, and build effective
            marketing strategies.
            <br />• <b>Business Plan:</b> You need a full, structured plan to
            launch effectively or refine a developed business, whether for
            internal use, partnerships, or funding purposes.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography style={{ fontWeight: 500 }}>
            Can I book a free consultation before committing?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Free consultations are available to discuss the process, general
            questions, and our past track record.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography style={{ fontWeight: 500 }}>
            How many revisions are included with each package?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Each section in every package includes two revisions—minor or major.
            Additional revisions may incur extra fees, depending on the scope of
            changes required.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography style={{ fontWeight: 500 }}>
            Do you provide industry-specific expertise (e.g. tech, retail,
            hospitality)?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes. Our consultants are selected for their expertise in specific
            industries—such as tech, retail, and hospitality—to ensure no key
            technical details are overlooked.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography style={{ fontWeight: 500 }}>
            How long does each service typically take from start to finish?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Timelines vary based on project scope and your turnaround time for
            feedback at each stage.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography style={{ fontWeight: 500 }}>
            How often will I meet or communicate with my consultant?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can reach out anytime via our chat feature for messages, or
            schedule live meetings at your convenience.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography style={{ fontWeight: 500 }}>
            Do you require a deposit or payment in instalments?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We typically require full payment upfront. For projects over
            $10,000, payment instalments can be arranged upon request.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <Typography style={{ fontWeight: 500 }}>
            What forms of payment do you accept?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We accept major credit and debit cards, securely processed via
            Stripe.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel10"}
        onChange={handleChange("panel10")}
      >
        <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
          <Typography style={{ fontWeight: 500 }}>
            Under what circumstances would I need a different quotation?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You may need a customized quotation for projects that are complex in
            nature, such as:
            <br />
            • More than one business model
            <br />
            • A budget exceeding $400,000
            <br />
            • Intricate operations or processes
            <br />• Medium- to large-sized enterprises
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel11"}
        onChange={handleChange("panel11")}
      >
        <AccordionSummary aria-controls="panel11d-content" id="panel11d-header">
          <Typography style={{ fontWeight: 500 }}>
            What happens if I need changes after the project is “complete”?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our process is divided into compartmentalized sections—each reviewed
            before proceeding—which minimizes the need for full-scale revisions.
            If additional changes are required post-completion, minor
            adjustments are accommodated.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel12"}
        onChange={handleChange("panel12")}
      >
        <AccordionSummary aria-controls="panel12d-content" id="panel12d-header">
          <Typography style={{ fontWeight: 500 }}>
            Can I upgrade or extend my service later on?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes. If you have completed Idea Generation, Idea & Finance, or
            Market Strategy, you can upgrade to a full Business Plan at a
            discounted rate based on your initial package.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel13"}
        onChange={handleChange("panel13")}
      >
        <AccordionSummary aria-controls="panel13d-content" id="panel13d-header">
          <Typography style={{ fontWeight: 500 }}>
            Who are your consultants, and how are they selected?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our consultants are carefully chosen through multiple interviews and
            a review of their experience and past projects to ensure they meet
            Horizon Consultancy&apos;s quality standards.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel14"}
        onChange={handleChange("panel14")}
      >
        <AccordionSummary aria-controls="panel14d-content" id="panel14d-header">
          <Typography style={{ fontWeight: 500 }}>
            Can you share examples of case studies or past projects?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Visit our Case Studies section to explore detailed examples of our
            work. For a more in-depth review, we offer free consultations to
            discuss what to expect from each package.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel15"}
        onChange={handleChange("panel15")}
      >
        <AccordionSummary aria-controls="panel15d-content" id="panel15d-header">
          <Typography style={{ fontWeight: 500 }}>
            What is your cancellation or refund policy?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Please refer to our{" "}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms &amp; Conditions.
            </a>{" "}
            for details on our cancellation and refund policy, including our
            money-back guarantee provisions.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel16"}
        onChange={handleChange("panel16")}
      >
        <AccordionSummary aria-controls="panel16d-content" id="panel16d-header">
          <Typography style={{ fontWeight: 500 }}>
            How do you protect my confidential information and ideas?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            All project work is covered by a strict confidentiality agreement
            and NDA. We limit access to only the consultants and team members
            directly involved, and use encrypted communication channels
            (SSL/TLS) and secure project portals to exchange files.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel17"}
        onChange={handleChange("panel17")}
      >
        <AccordionSummary aria-controls="panel17d-content" id="panel17d-header">
          <Typography style={{ fontWeight: 500 }}>
            Where is my data stored, and who has access to it?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Your data resides on encrypted, Canadian-region cloud servers that
            comply with PIPEDA. Only authorised Horizon Consultancy staff and
            your assigned consultant can access your account files and project
            documents.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel18"}
        onChange={handleChange("panel18")}
      >
        <AccordionSummary aria-controls="panel18d-content" id="panel18d-header">
          <Typography style={{ fontWeight: 500 }}>
            Will I own all rights to the final deliverables?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes. Once the project is complete and payment is settled, you
            receive full intellectual-property rights to every document and
            deliverable we produce. You&apos;re free to use, modify, and share
            them as you wish.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
