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
            Can you customize a Business Plan for my specific industry?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Horizon Consultancy supports businesses across all industries. If we
            encounter technicalities that require additional practical
            knowledge, we collaborate with our partners to ensure thorough
            coverage of every detail.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography style={{ fontWeight: 500 }}>
            What is the duration, planned order of section delivery, and
            estimated progress percentage for each section?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The overall duration is as mentioned in the bundles however it might
            fluctuate based on the number of revisions or needed amendments.
            <br />
            The order and completion percentage of the Business Plan bundle is
            as follows: • Business Model 30% • Risk and Mitigation 5% •
            Marketing Strategy 25% • Description of Management and Organisation
            5% • Financial Projections 30% • Growth Strategy 5%
            <br />
            The order and completion percentage of the Idea and Finance is as
            follows: • Idea Validation 15% • Business Model 45% • Financial
            Analysis 40%
            <br />
            The order and completion percentage of the Market Study is as
            follows: • Business Model 45% • Lead Generation 15% • Competitor
            Assessment 15% • Marketing Plan 25%
            <br />
            The order and completion percentage of the Idea Generation is as
            follows: • Business Idea Proposals 40% • Idea Analysis 60%
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography style={{ fontWeight: 500 }}>
            Do you provide financial projections?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, we provide financial projections and planning. They are
            integral parts of our Business Plan. You can expect to have
            financial planning in the Business Plan and Business Model and
            Financial Planning bundles.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography style={{ fontWeight: 500 }}>
            What qualifications and experience do your Business Plan writers
            have?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To ensure comprehensive coverage of all industries and business
            aspects, we have diversified our consultants based on their
            expertise. This collection of knowledge optimizes the final result.
            Check our consultants&apos;background in{" "}
            <Link href="/consultants">Our consultants</Link> page.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography style={{ fontWeight: 500 }}>
            Can I request revisions to the Business Plan?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The pillar of your Business Plan is the business model which is the
            first section you will receive. All other sections are derived from
            it. Developing the business model is an interactive process shaped
            by collaborative discussions with you and backed by thorough market
            research.
            <br />
            Through this process, revisions are seldom required; however, if
            necessary, we offer two complimentary revisions.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography style={{ fontWeight: 500 }}>
            How do I communicate with my consultant during the Business Plan
            creation process?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Your initial point of contact with your consultant is our chat room.
            Here, you can leave messages, engage in real-time chats, or arrange
            video or audio meetings at your convenience.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography style={{ fontWeight: 500 }}>
            What makes your Business Plan services stand out compared to others?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            In the early stages of developing the Business Plan template, our
            main priority was to ensure it was not only practical and
            implementable but also based on real data obtained from extensive
            market research and analysis of findings. Additionally, we
            emphasized the simplicity and clarity of the process.
            <br />
            Our approach is distinct because we divide the entire process into
            clear steps to avoid confusion and ensure you fully grasp your
            business&apos;s essence and what it requires to survive and expand.
            We mentor you throughout the course of the project.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography style={{ fontWeight: 500 }}>
            What level of detail should I expect in the Proposed Business Ideas?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            At first, you will receive the Idea Proposals outlining and
            comparing ideas in a table. This document will briefly cover:
            <br />• Value Proposition: What each idea offers or aims to achieve.{" "}
            <br /> • Required Skills: The skills needed to execute each idea.{" "}
            <br /> • Team Needs: Whether the idea requires a team and what roles
            are needed. <br /> • Resources Required: What resources (such as
            technology, equipment, etc.) are necessary. <br /> • Approximate
            Budget: Estimated costs associated with each idea. <br /> •
            Financing Options: How each idea could be funded or financed. <br />{" "}
            • Pros and Cons: Advantages and disadvantages of each idea.
            <br />• Growth Prospects: Potential for growth or scalability of
            each idea.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <Typography style={{ fontWeight: 500 }}>
            Will the Proposed Business Ideas be tailored to my specific goals
            and preferences?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            These ideas will be unique to your background, preferences, and
            budget. To make sure this is the case, we might contact you for
            further details before proposing anything.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel10"}
        onChange={handleChange("panel10")}
      >
        <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
          <Typography style={{ fontWeight: 500 }}>
            How many different business ideas can I expect to receive based on
            the questionnaire?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We usually propose two business ideas for you to choose from.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel11"}
        onChange={handleChange("panel11")}
      >
        <AccordionSummary aria-controls="panel11d-content" id="panel11d-header">
          <Typography style={{ fontWeight: 500 }}>
            If I don&apos;t like the Proposed Ideas can I ask for different
            business ideas?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, we can change the ideas for you once we understand why the
            initial ones were not to your liking. Our goal is to help you find a
            business that fits you well, follow market trends, and take
            advantage of existing opportunities, as this is crucial for your
            success.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel12"}
        onChange={handleChange("panel12")}
      >
        <AccordionSummary aria-controls="panel12d-content" id="panel12d-header">
          <Typography style={{ fontWeight: 500 }}>
            What should I expect from the Idea Analysis phase?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Here&apos;s a refined version of how we will provide a detailed and
            comprehensive analysis of your chosen business idea:
            <br />• Addressing Concerns: We will thoroughly explore each of your
            concerns by providing background information on various aspects
            related to the business idea. This will clarify any uncertainties
            and pave the way for practical solutions.
            <br /> • Aligning Skills with the Business: We will match your
            specific skills and expertise with the requirements and demands of
            the business idea. This will outline your role within the venture,
            ensuring clarity and alignment.
            <br /> • Assessing Team Needs: We&apos;ll evaluate the necessity of
            assembling a team and outline the functions of each entity. This
            includes exploring options like outsourcing tasks to external
            partners or contractors rather than hiring full-time employees.
            <br /> • Funding Options: Based on the nature of the business idea
            and your budget, we will present various funding options. These
            could include self-funding, seeking investors, crowd funding, or
            obtaining loans/grants.
            <br /> • Future Growth Projections: We will project potential
            directions your company can take to foster growth and expansion in
            the future. This involves analyzing market trends, identifying
            opportunities for scaling, and outlining strategic pathways for
            development.
            <br /> • Initiating the Business: To provide further clarity on your
            journey, we&apos;ll outline essential steps for starting your
            business. These task-based instructions, including prerequisites,
            will significantly reduce uncertainty. We aim to provide a
            comprehensive and actionable analysis of your business idea,
            enabling you to make informed decisions and chart a successful
            course forward.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel13"}
        onChange={handleChange("panel13")}
      >
        <AccordionSummary aria-controls="panel13d-content" id="panel13d-header">
          <Typography style={{ fontWeight: 500 }}>
            How do we ensure adherence to the process?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            By monitoring chat rooms and recording all calls we ensure strict
            adherence to the process and protect all parties involved. This
            comprehensive data enables us to promptly address any issues and
            maintain transparency.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel14"}
        onChange={handleChange("panel14")}
      >
        <AccordionSummary aria-controls="panel14d-content" id="panel14d-header">
          <Typography style={{ fontWeight: 500 }}>
            Is there a money-back guarantee clause?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To understand our clauses, we recommend reviewing the project
            cancellation terms outlined in the Terms and Agreements section to
            prevent any misunderstandings or issues down the line. This will
            help ensure clarity and avoid any unexpected problems.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
