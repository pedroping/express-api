import { deleteUserById, getUsers } from "../db/users";
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send("Id invalido ou inexistente!");

    const deletedUser = await deleteUserById(id);

    if (!deletedUser)
      res.status(400).send("Ocorreu um erro ao deletar o usuário!");

    return res.status(200).send("Usuário deletado com sucesso!").end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
