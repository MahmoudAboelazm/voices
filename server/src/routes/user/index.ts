import express from "express";
import { uploadImage } from "../../common/utils/uploadFile";
import { routeIsAuth } from "../../middlewares/routeIsAuth";
import { login } from "./services/login";
import { logout } from "./services/logout";
import { me } from "./services/me";
import { register } from "./services/register";
import { updateBio } from "./services/updateBio";
import { updateImage } from "./services/updateImage";
import { userProfile } from "./services/userProfile";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", routeIsAuth, me);
router.get("/logout", logout);
router.get("/profile/:userId", userProfile);
router.patch("/update/bio", routeIsAuth, updateBio);
router.patch(
  "/update/image",
  routeIsAuth,
  uploadImage({ name: "image", size: 1024 * 1024 * 5 }),
  updateImage,
);
export default router;
