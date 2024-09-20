import { getUsers } from "../db/users";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    if (!users) return res.sendStatus(400);

    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
