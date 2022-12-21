const router = require("express").Router();

const {
  user_addUser_post,
  user_getUsers_get,
  user_getSingleUser_get,
  user_updateUser_patch,
  user_deleteUser_delete,
  user_issueBook_patch,
  user_returnBook_patch,
} = require("../controllers/userController");

router.post("/addUser", user_addUser_post);

router.get("/getUsers", user_getUsers_get);

router.get("/getUser/:id", user_getSingleUser_get);

router.patch("/getUser/:id", user_updateUser_patch);

router.delete("/getUser/:id", user_deleteUser_delete);

router.patch("/issuebook", user_issueBook_patch);

router.patch("/returnBook", user_returnBook_patch);

module.exports = router;
