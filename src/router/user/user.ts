import { Router } from "express";
import {
  deleteUser,
  editUser,
  getAllUsers,
  getUser,
} from "../../controllers/users";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { isOwner } from "../../middlewares/isOwner";

export default (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/user/:id", isAuthenticated, getUser);
  router.delete("/user/:id", isAuthenticated, isOwner, deleteUser);
  router.put("/user/:id", isAuthenticated, isOwner, editUser);
};
