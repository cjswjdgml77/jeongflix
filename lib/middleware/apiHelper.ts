import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const apiHelper = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
