import { deleteUser, getAllUsers } from "../../controllers/users";
import { Router } from "express";

export default (router: Router) => {
  router.get("/users", getAllUsers);
  router.delete("/user/:id", deleteUser);
};
