import { register } from "../../controllers/authentication";
import { Router } from "express";

export default (router: Router) => {
  router.post("/auth/register", register);
};
