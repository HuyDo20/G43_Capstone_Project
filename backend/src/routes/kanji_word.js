const express = require("express");
const { getAllKanjiWord, login } = require("../controllers").kanji_word;
const router = express.Router();

router.get("/kanji_word", getAllKanjiWord);

module.exports = router;
