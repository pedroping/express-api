import { getUserBySessionToken } from "../db/users";
import { NextFunction, Request, Response } from "express";
import { merge } from "lodash";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[process.env.AUTH];

    if (!token) return res.status(401).send("Token invalido ou inexistente!");

    const user = await getUserBySessionToken(token);

    if (!user) return res.status(401).send("Usuário não encontrado!");

    merge(req, { identity: user });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
