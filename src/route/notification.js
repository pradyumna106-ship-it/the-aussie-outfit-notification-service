import express from "express";

import {
  sendOrderConfirmationNotification,
  sendPasswordResetNotification,
  getUserNotifications
} from "../controller/notification.js";

const router = express.Router();

router.post(
  "/order-confirmation",
  sendOrderConfirmationNotification
);

router.post(
  "/password-reset",
  sendPasswordResetNotification
);

router.get(
  "/user/:userId",
  getUserNotifications
);

export default router;