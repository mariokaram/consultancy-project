import { Resend } from "resend";
import EmailTemplate from "@/pages/components/EmailTemplate";
import { EmailConfig } from "next-auth/providers";
import { configs } from "@/utils/config";

export async function CustomsendVerificationRequest(params: {
  identifier: string;
  url: string;
  provider: EmailConfig;
}) {
  const { identifier, url, provider } = params;
  const resend = new Resend(configs.resend_api);

  await resend.sendEmail({
    from: provider.from || "",
    to: identifier,
    subject: "Welcome to Horizon-Consultancy",
    react: <EmailTemplate type="login" link={url} />,
  });
}
