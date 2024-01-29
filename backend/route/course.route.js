const express = require("express");

const upload = require("../middleware/multer.middleware.js");
const {
  createcourse,
  deletecourse,
  updatecourse,
  getallthecourse,
} = require("../controller/course.controller.js");
const {
  isauthenicated,
  authorization,
} = require("../middleware/auth.middleware.js");
const router = express.Router();
router
  .route("/createcourse")
  .post(
    isauthenicated,
    authorization("admin"),
    upload.single("thumbnail"),
    createcourse
  );
router
  .route("/delete/:id")
  .delete(isauthenicated, authorization("admin"), deletecourse);
router
  .route("/update/:id")
  .put(isauthenicated, authorization("admin"), updatecourse);
router.route("/getcourses").get(getallthecourse);

module.exports = router;
