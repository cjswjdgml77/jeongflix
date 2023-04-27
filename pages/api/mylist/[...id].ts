import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401);
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email || "",
    },
    include: { farvoriteeMovies: true },
  });
  const favoriteMovie = user?.farvoriteeMovies.filter(
    (movie) => movie.content_id === Number(id![0])
  );
  return res.status(200).send({ mylist: favoriteMovie });
}
