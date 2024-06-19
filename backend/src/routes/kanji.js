const express = require("express");
const { getAllKanjiByDayId, getKanjiById, createNewKanji, updateKanjiById, deleteKanjiById } =
	require("../controllers").kanji;
const router = express.Router();
const { checkAuthAndRole } = require("../middleware/auth");

router.get("/kanji", checkAuthAndRole([1, 2, 3, 4]), getAllKanjiByDayId);
router.get("/kanji/:kanji_id", checkAuthAndRole([1, 2, 3, 4]), getKanjiById);
router.post("/kanji", checkAuthAndRole([1, 3]), createNewKanji);
router.put("/kanji/:kanji_id", checkAuthAndRole([1, 3]), updateKanjiById);
router.patch("/kanji/kanji_id", checkAuthAndRole([1, 3]), deleteKanjiById);

module.exports = router;
