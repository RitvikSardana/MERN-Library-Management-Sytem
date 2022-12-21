const router = require("express").Router();
const {
  book_addBook_post,
  book_getBooks_get,
  book_getIssuedBook_get,
  book_getSingleBook_get,
  book_updateBook_patch,
  book_deleteBook_delete,
} = require("../controllers/bookController");

router.post("/addBook", book_addBook_post);

router.get("/getBooks", book_getBooks_get);

router.get("/getIssuedBook", book_getIssuedBook_get);

router.get("/getBook/:id", book_getSingleBook_get);

router.patch("/getBook/:id", book_updateBook_patch);

router.delete("/getBook/:id", book_deleteBook_delete);

module.exports = router;
