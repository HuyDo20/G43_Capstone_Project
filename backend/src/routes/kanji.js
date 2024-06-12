const express = require("express");
const { getAllKanji, login } = require("../controllers").kanji;
const router = express.Router();

router.get("/kanji", getAllKanji);

module.exports = router;
