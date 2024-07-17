const express = require("express");
const { registerAccount,createUser, getListUser, updateUserById, deleteUserById, getUserById, loginAccount, verifyOtp,resendOtp } =
	require("../controllers").account;
const { checkAuthAndRole } = require("../middleware/auth");
const { registerAccountSystem, logoutAccount } = require("../controllers/account");
const router = express.Router();

router.post("/login", loginAccount);
router.post("/register", registerAccount);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/create-account-system", registerAccountSystem);
router.get("/account", checkAuthAndRole([1]), getListUser);
router.patch("/account/:account_id", checkAuthAndRole([1]), deleteUserById);
router.put("/account/:account_id", checkAuthAndRole([1, 2, 3, 4]), updateUserById);
router.get("/account/:account_id", checkAuthAndRole([1, 2, 3, 4]), getUserById);
router.post("/logout", checkAuthAndRole([1, 2, 3, 4]), logoutAccount);
router.post("/account", createUser);

module.exports = router;
