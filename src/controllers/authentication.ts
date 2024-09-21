import { createUser, getUserByEmail } from "../db/users";
import { Request, Response } from "express";
import { auth } from "../utils/auth";
import { randomId } from "../utils/randomId";
import { IUser } from "../models/user";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username)
      return res.status(400).send("Parametros invalidos!");

    const alreadyHasUser = await getUserByEmail(email);

    if (alreadyHasUser)
      return res.status(400).send("Usuario com mesmo email já adicionado!");

    const salt = randomId();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: auth(salt, password),
      },
    });

    const mappedUser: IUser = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    return res.status(200).json(mappedUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("Parametros invalidos!");

    const user = await getUserByEmail(email).select(
      "+authentication.salt, +authentication.password"
    );

    if (!user) return res.status(401).send("Usuário não encontrado!");

    const hash = auth(user.authentication.salt, password);

    if (user.authentication.password != hash)
      return res.send(401).send("Senha invalida");

    const salt = randomId();
    user.authentication.sessionToken = auth(salt, user._id.toString());

    await user.save();

    res.cookie(process.env.AUTH, user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    const mappedUser: IUser = {
      sessionToken: user.authentication.sessionToken,
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    return res.status(200).json(mappedUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
