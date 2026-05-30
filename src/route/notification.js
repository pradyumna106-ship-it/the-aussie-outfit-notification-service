import express from "express";

import {
  sendOrderConfirmationNotification,
  sendPasswordResetNotification,
  getUserNotifications,
  updateNotification
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

router.put("/:id", updateNotification);

export default router;