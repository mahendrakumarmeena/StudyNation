const Razorpay = require("razorpay");

exports.instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY,
	key_secret: process.env.RAZORPAY_SECRET,
});

// const RAZORPAY_KEY = "rzp_test_fUIZAI25WMgGwi"

// const RAZORPAY_SECRET = "DOdtPrjZRxQejIdj1vAzm0MY"

// exports.instance = new Razorpay({
// 	key_id: RAZORPAY_KEY,
// 	key_secret: RAZORPAY_SECRET,
// });