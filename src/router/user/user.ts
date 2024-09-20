import { getAllUsers } from "../../controllers/users";
import { Router } from "express";

export default (router: Router) => {
  router.get("/users", getAllUsers);
};
