import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { getServerSession } from "next-auth/next";
import cors from "cors";
import { configs } from "@/utils/config";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
import rateLimit from "./rate-limit";
export interface NextApiRequestExtended extends NextApiRequest {
  userId: string;
  userRole: string;
  userName: string;
}

export function getHandler({
  auth = true,
  limit = 10,
  interval = 60,
  urlRateLimit = "",
}: {
  auth?: boolean;
  limit?: number;
  interval?: number;
  urlRateLimit?: string;
}) {
  const handleCors = cors({
    origin: configs.webUrl,
  });
  const limiter = rateLimit({
    limit,
    interval: interval * 1000,
    urlRateLimit,
  });

  return nextConnect<NextApiRequestExtended, NextApiResponse>({
    onError(error, req, res) {
      if (error?.message === "Rate limit exceeded") {
        res.status(429).json({ error: error?.message });
      } else if (error?.message === "not authorized") {
        res.status(401).json({ error: error?.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req["method"]} Not Allowed` });
    },
  })
    .use(handleCors)
    .use(async (req, res, next) => {
      try {
        if (auth) {
          const session: any = await getServerSession(req, res, optionsAuth);
          if (session) {
            const { isRateLimited } = limiter.check(session.user["id"]);

            if (isRateLimited) {
              return next(Error("Rate limit exceeded"));
            }
            req.userId = session.user["id"];
            req.userRole = session.user["role"];
            req.userName = session.user["name"];
            next();
          } else {
            next(Error("not authorized"));
          }
        } else {
          const { isRateLimited } = limiter.check("AuthNotRequired");
          if (isRateLimited) {
            return next(Error("Rate limit exceeded"));
          }
          next();
        }
      } catch (error) {
        next(Error("oh error from catch"));
      }
    });
}

export const messageSuccess = (
  codeNumber: number,
  data: any,
  isNeededToBeParse: boolean = true
) => {
  const jsonMessage = {
    success: true,
    status_code: codeNumber,
    result: isNeededToBeParse ? JSON.parse(data) : data,
  };
  return jsonMessage;
};

export const messageError = (codeNumber: number, errMsg: string) => {
  const jsonMessage = {
    success: false,
    status_code: codeNumber,
    message: errMsg,
  };
  return jsonMessage;
};
