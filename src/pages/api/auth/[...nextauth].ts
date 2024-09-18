import NextAuth, { NextAuthOptions } from "next-auth";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";
import * as entities from "@/lib/entities";
import EmailProvider from "next-auth/providers/email";
import { configs } from "@/utils/config";
import { CustomsendVerificationRequest } from "./signinemail";
import GoogleProvider from "next-auth/providers/google";
import { insertLogs } from "@/utils/shared";

export const optionsAuth: NextAuthOptions = {
  adapter: TypeORMLegacyAdapter(
    {
      type: "mysql",
      host: configs.host,
      port: configs.port as number,
      username: configs.user,
      password: configs.password,
      database: configs.database,
      ssl: {
        rejectUnauthorized: process.env.NODE_ENV === "production",
        ca: configs.cert,
      },
    },
    {
      entities,
    }
  ),

  logger: {
    error(code: string, metadata: object) {
      insertLogs(
        "api",
        "[...nextauth]",
        "signin",
        JSON.stringify(metadata + code)
      );
    },
  },

  secret: configs.secret as string,

  providers: [
    EmailProvider({
      server: configs.EMAIL_SERVER,
      from: configs.EMAIL_FROM,
      sendVerificationRequest({ identifier, url, provider }) {
        CustomsendVerificationRequest({ identifier, url, provider });
      },
    }),
    GoogleProvider({
      clientId: configs.GOOGLE_CLIENT_ID as string,
      clientSecret: configs.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (session && user) {
        session.user.role = (user as any).role;
        session.user.id = (user as any).id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },
};

export default NextAuth(optionsAuth);
