import { Notification } from "../models/notification.js";
import { MessageLog } from "../models/messageLog.js";

export const sendOrderConfirmationNotification = async (req, res) => {
  try {

    const {
      userId,
      orderId,
      email
    } = req.body;

    if (!userId || !orderId) {
      return res.status(400).json({
        success: false,
        message: "userId and orderId are required"
      });
    }

    const notification = await Notification.create({
      userId,
      title: "Order Confirmation",
      message: `Your order ${orderId} has been confirmed`,
      type: "order",
      channel: "email",
      metadata: {
        orderId,
        email
      }
    });

    await MessageLog.create({
      notificationId: notification._id,
      status: "sent",
      provider: "system",
      response: "Order confirmation notification sent"
    });

    return res.status(201).json({
      success: true,
      message: "Order confirmation notification sent successfully",
      data: notification
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const sendPasswordResetNotification = async (req, res) => {
  try {

    const {
      userId,
      email,
      resetToken
    } = req.body;

    if (!userId || !resetToken) {
      return res.status(400).json({
        success: false,
        message: "userId and resetToken are required"
      });
    }

    const notification = await Notification.create({
      userId,
      title: "Password Reset",
      message: `Your password reset token is ${resetToken}`,
      type: "security",
      channel: "email",
      metadata: {
        email,
        resetToken
      }
    });

    await MessageLog.create({
      notificationId: notification._id,
      status: "sent",
      provider: "system",
      response: "Password reset notification sent"
    });

    return res.status(201).json({
      success: true,
      message: "Password reset notification sent successfully",
      data: notification
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getUserNotifications = async (req, res) => {
  try {

    const { userId } = req.params;

    const notifications = await Notification.find({
      userId
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};