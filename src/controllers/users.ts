import { IUser } from "../models/user";
import { deleteUserById, getUsers, updateUserById } from "../db/users";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    if (!users) return res.sendStatus(400);

    const mappedUsers: IUser[] = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
    }));

    return res.status(200).json(mappedUsers).end();
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

export const editUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, username } = req.body;

    if (!id) return res.status(400).send("Id invalido ou inexistente!");

    if (!email || !username)
      return res.status(400).send("Parâmetros invalidos ou inexistentes!");

    const user = await updateUserById(id, { email, username });

    if (!user) res.status(400).send("Ocorreu um erro ao editar o usuário!");

    const mappedUser: IUser = {
      username: user.username,
      email: user.email,
      id: user.id,
    };

    return res.status(200).json(mappedUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
