import NextAuth from "next-auth";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";
import * as entities from "@/lib/entities";
import EmailProvider from "next-auth/providers/email";
import { configs } from "@/utils/config";
import { CustomsendVerificationRequest } from "./signinemail";
export const optionsAuth = {
  adapter: TypeORMLegacyAdapter(
    `mysql://${configs.user}:${configs.password}@${configs.host}:${configs.port}/${configs.database}`,
    { entities }
  ),

  secret: configs.secret,
  providers: [
    EmailProvider({
      server: configs.EMAIL_SERVER,
      from: configs.EMAIL_FROM,
      sendVerificationRequest({ identifier, url, provider }) {
        CustomsendVerificationRequest({ identifier, url, provider });
      },
    }),
  ],

  callbacks: {
    async session({ session, user }: any) {
      if (session) {
        session.user.role = user.role;
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/500",
  },
};

export default NextAuth(optionsAuth);
