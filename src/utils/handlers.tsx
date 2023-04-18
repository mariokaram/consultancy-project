import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import cors from "cors";
import { getSession } from "next-auth/react";
export interface NextApiRequestExtended extends NextApiRequest {
  userId: string | null;
}

export function getHandler(auth: any) {
  const handler = nextConnect<NextApiRequestExtended, NextApiResponse>({
    onError(error, req, res) {
      res
        .status(401)
        .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req["method"]} Not Allowed` });
    },
  });

  // Apply cors middleware
  handler.use(
    cors({
      origin: "https://facebook.com",
      methods: ["POST"],
    })
  );

  // Apply authentication middleware if required
  if (auth) {
    handler.use(async (req, res, next) => {
      try {
        const session: any = await getSession({ req });
        if (session) {
          req.userId = session.user["id"];
          next();
        } else {
          next(Error("not authorized"));
        }
      } catch (error) {
        next(Error("oh error from catch"));
      }
    });
  }

  return handler;
}

export const messageSuccess = (codeNumber: any, data: any) => {
  let jsonMessage = {
    success: true,
    status_code: codeNumber,
    result: data,
  };
  return jsonMessage;
};

export const messageError = (codeNumber: any, errMsg: any) => {
  let jsonMessage = {
    success: false,
    status_code: codeNumber,
    message: errMsg,
  };
  return jsonMessage;
};
