const express = require("express");
const { getAllAlphabet, getAllAlphabetByTypeId } = require("../controllers/alphabet");

const router = express.Router();
const { checkAuthAndRole } = require("../middleware/auth");

router.get("/alphabet", checkAuthAndRole([1, 2, 3, 4]), getAllAlphabet);
router.get("/alphabet", checkAuthAndRole([1, 2, 3, 4]), getAllAlphabetByTypeId);

module.exports = router;
