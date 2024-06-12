const express = require("express");
const { getAllAlphabetTypes } = require("../controllers").alphabet_types;
const router = express.Router();

router.get("/alphabet_types", getAllAlphabetTypes);

module.exports = router;
