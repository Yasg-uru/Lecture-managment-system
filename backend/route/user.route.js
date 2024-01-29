const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.middleware.js");

const {
  createuser,
  loginuser,
  getdetail,
  logout,
  forgotpassword,
  resetpassword,
  updatepassword,
  getalluser,
  getsingleuser,
  updateuserprofile,
  updateuserrole,
  deleteuser,
  savemovie,
  getallsavedmovies,
  editprofile,
  deleteuserbyuser,
  getenrolledcourses,
} = require("../controller/user.controller.js");
const {
  isauthenicated,
  authorization,
} = require("../middleware/auth.middleware.js");
router.route("/register").post(upload.single("profile"), createuser);
router.route("/login").post(loginuser);
router.route("/me").get(isauthenicated, getdetail);
router.route("/logout").post(logout);

router.route('/editprofile').post(isauthenicated,upload.single('profile'),editprofile);
router.route("/password/forgot").post(forgotpassword);

router.route("/password/reset/:token").post(resetpassword);
router.route("/update/password").post(isauthenicated, updatepassword);
router.route("/delete").delete(isauthenicated,deleteuserbyuser)
// router.route('/getalluser').get(getalluser);
// router.route('/getalluser').get(getalluser);
router
  .route("/getalluser")
  .get(isauthenicated, authorization("admin"), getalluser);

router
  .route("/getsingleuser/:id")
  .get(isauthenicated, authorization("admin"), getsingleuser);
router
  .route("/update/profile/:id")
  .post(isauthenicated, authorization("admin"), updateuserprofile);

router
  .route("/update/role/:id")
  .post(isauthenicated, authorization("admin"), updateuserrole);

// router.route('/delete/user/:id').delete(deleteuser);
router
  .route("/delete/user/:id")
  .delete(isauthenicated, authorization("admin"), deleteuser);

router.route("/savemovie/:id").post(isauthenicated, savemovie);
router.route("/getallsavedmovie").get(isauthenicated, getallsavedmovies);


router.route('/enrolledcourses').get(isauthenicated,getenrolledcourses);

module.exports = router;
