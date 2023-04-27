import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401);
  switch (req.method) {
    case "GET":
      const mylist = await prisma.user.findUnique({
        where: { email: session.user?.email || "" },
        include: { farvoriteeMovies: true },
      });
      const data = mylist?.farvoriteeMovies;
      return res.status(200).json({ mylist: data });

    case "POST":
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      const {
        data: { id, backdrop_path, poster_path, title },
      } = req.body;
      const user = await prisma.user.update({
        where: {
          email: session.user?.email || "",
        },
        data: {
          farvoriteeMovies: {
            create: {
              content_id: id,
              key: `${id}${characters.charAt(
                Math.floor(Math.random() * charactersLength)
              )}`,
              title: title,
              backdrop_path: backdrop_path,
              poster_path: poster_path,
            },
          },
        },
      });
      res.status(200).send({ user });
  }
}
