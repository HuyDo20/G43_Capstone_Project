const express = require("express");
const { 
    getAllAlphabet, 
    getAllAlphabetByTypeId 
} = require("../controllers/alphabet");

const router = express.Router();

router.get("/alphabet", getAllAlphabet);
router.get("/alphabet/:type_id", getAllAlphabetByTypeId);

module.exports = router;
