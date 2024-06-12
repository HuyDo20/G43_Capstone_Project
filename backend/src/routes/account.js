const express = require("express");
const { registerAccount, getListUser, updateUserById, deleteUserById, getUserById, loginAccount } =
	require("../controllers").account;
const { checkAuthAndRole } = require("../middleware/auth");
const { registerAccountSystem, logoutAccount } = require("../controllers/account");
const router = express.Router();

router.post("/login", loginAccount);
router.post("/register", registerAccount);
router.post("/create-account-system", registerAccountSystem);
router.get("/account", checkAuthAndRole([1]), getListUser);
router.patch("/account/:account_id", checkAuthAndRole([1]), deleteUserById);
router.put("/account/:account_id", checkAuthAndRole([1, 2, 3, 4]), updateUserById);
router.get("/account/:account_id", checkAuthAndRole([1, 2, 3, 4]), getUserById);
router.post("/logout", checkAuthAndRole([1, 2, 3, 4]), logoutAccount);

module.exports = router;
