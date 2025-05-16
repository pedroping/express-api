import { Router } from "express";
import authentication from "./authentication/authentication";
import user from "./user/user";

const router = Router();

export default (): Router => {
  authentication(router);
  user(router);
  return router;
};
