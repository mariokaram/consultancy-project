import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getSession } from 'next-auth/client';
export interface NextApiRequestExtended extends NextApiRequest {
 userId: string | null;
}

export function getHandler(auth: any) {
 return nextConnect<NextApiRequestExtended, NextApiResponse>({
  onError(error, req, res) {
   res.status(401).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
   res.status(405).json({ error: `Method ${req['method']} Not Allowed` });
  }
 }).use(async (req, res, next) => {
  try {
   if (auth) {
    const session : any = await getSession({ req });
    if (session) {
     req.userId = session.user['id'];
     next();
    } else {
     next(Error('not authorized'));
    }
   } else {
    next();
   }
  } catch (error) {
   next(Error('oh error from catch'));
  }
 });
}

export const messageSuccess = (codeNumber: any, data: any) => {
 let jsonMessage = {
  success: true,
  status_code: codeNumber,
  result: data
 };
 return jsonMessage;
};

export const messageError = (codeNumber: any, errMsg: any) => {
 let jsonMessage = {
  success: false,
  status_code: codeNumber,
  message: errMsg
 };
 return jsonMessage;
};
