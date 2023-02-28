import NextAuth, { AuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";
import * as entities from "@/lib/entities";
import { NextApiRequest, NextApiResponse } from "next";
const options = {
  adapter: TypeORMLegacyAdapter(
    "mysql://mario:password@127.0.0.1:3306/consultency",
    { entities }
  ),

  secret: "TgYalhK721BjKVyk+30uKT9VDJaVNGgd2EDic239icw=",

  callbacks: {
    async session(
      session: { user: { role: any; id: any } },
      user: { role: any; id: any }
    ) {
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

const next = (
  req: NextApiRequest,
  res: NextApiResponse,
  options: AuthOptions
) => NextAuth(req, res, options);
export default next;
