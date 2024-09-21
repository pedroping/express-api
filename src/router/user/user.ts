import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { deleteUser, editUser, getAllUsers } from "../../controllers/users";
import { Router } from "express";

export default (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/user/:id", isAuthenticated, deleteUser);
  router.put("/user/:id", isAuthenticated, editUser);
};
