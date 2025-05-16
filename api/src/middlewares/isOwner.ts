import { NextFunction, Request, Response } from "express";
import { get } from "lodash";

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const actualId = get(req, "identity._id") as string;

    if (!actualId) return res.sendStatus(401).send("Usuário não encontrado!");

    if (id != actualId.toString())
      return res.sendStatus(401).send("Usuário diferente do a ser excluido");

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
