import { createUser, getUserByEmail } from "db/users";
import { Request, Response } from "express";
import { auth } from "utils/auth";
import { randomId } from "utils/randomId";

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

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
