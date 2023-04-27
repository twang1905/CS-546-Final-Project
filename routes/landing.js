import { Router } from "express";
const router = Router();
import validator from "../validator.js";
import userData from "../data/users.js";

router.route("/")
  .get(async (req, res) => {
    try{
      res.render('landing', { title: 'Landing' });
    } catch(e) {
      res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    const inputInfo = req.body;
    let { usernameInput, passwordInput } = inputInfo;

    try {
      usernameInput = validator.checkUserName(usernameInput, "username");
      passwordInput = validator.checkPassword(passwordInput, "password");
    } catch(e) {
      return res.status(400).render('landing', {title: 'Landing', username: usernameInput, error: e });
    }

    try {
      let user = userData.authUser(usernameInput, passwordInput);

      req.session.user = {
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        buildingOwnership: user.buildingOwnership,
        buildingManageAccess: user.buildingManageAccess,
        buildingViewAccess: user.buildingViewAccess,
        buildingFavorites: user.buildingFavorites,
      };
    } catch(e) {
      return res.status(400).render('landing', { title: 'Landing', error: e });
    }
  });

  router.route("/register")
  .get(async (req, res) => {
    try{
      res.render('register', { title: 'Register' });
    } catch(e) {
      res.status(500).send(e);
    }
  });

export default router;
