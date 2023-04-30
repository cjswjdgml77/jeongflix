import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Favorites } from "@/hooks/useFavorites";
import favorites from ".";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401);
  if (req.method === "GET") {
    const { id } = req.query;
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email || "",
      },
      include: { farvoriteeMovies: true },
    });
    const favoriteMovie = user?.farvoriteeMovies.filter(
      (movie) => movie.content_id === Number(id![0])
    );
    return res.status(200).send({ favorites: favoriteMovie });
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const movieId = id![0];
    const result = await prisma.favoriteMovies.delete({
      where: {
        id: movieId,
      },
    });

    res.status(200).send({ result });
  }
}
