import { Notification } from "../models/notification.js";
import { MessageLog } from "../models/messageLog.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// =========================================
// ORDER CONFIRMATION EMAIL
// =========================================

export const sendOrderConfirmationNotification = async (req, res) => {
  try {

    const {
      userId,
      orderId,
      email,
      orderNumber
    } = req.body;

    if (!userId || !orderId || !email) {
      return res.status(400).json({
        success: false,
        message: "userId, orderId and email are required"
      });
    }

    // SAVE NOTIFICATION

    const notification = await Notification.create({
      userId,
      title: "Order Confirmation",
      message: `Your order #${orderNumber} has been confirmed`,
      type: "order",
      channel: "email",
      metadata: {
        orderId,
        email
      }
    });

    // SEND EMAIL

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Order Confirmation",
      html: `
        <h2>Order Confirmed</h2>
        <p>Your order #<b>${orderNumber}</b> has been placed successfully.</p>
      `
    };

    const emailResponse = await transporter.sendMail(mailOptions);

    // SAVE MESSAGE LOG

    await MessageLog.create({
      notificationId: notification._id,
      status: "sent",
      provider: "gmail",
      response: emailResponse.response
    });

    return res.status(201).json({
      success: true,
      message: "Order confirmation email sent successfully",
      data: notification
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =========================================
// PASSWORD RESET EMAIL
// =========================================

export const sendPasswordResetNotification = async (req, res) => {
  try {

    const {
      userId,
      email,
      resetToken
    } = req.body;

    if (!userId || !email || !resetToken) {
      return res.status(400).json({
        success: false,
        message: "userId, email and resetToken are required"
      });
    }

    // SAVE NOTIFICATION

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

    // SEND EMAIL

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      html: `
        <h2>Password Reset</h2>
        <p>Your reset token is:</p>
        <h3>${resetToken}</h3>
      `
    };

    const emailResponse = await transporter.sendMail(mailOptions);

    // SAVE MESSAGE LOG

    await MessageLog.create({
      notificationId: notification._id,
      status: "sent",
      provider: "gmail",
      response: emailResponse.response
    });

    return res.status(201).json({
      success: true,
      message: "Password reset email sent successfully",
      data: notification
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =========================================
// GET USER NOTIFICATIONS
// =========================================

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

export const updateNotification = async (req, res) => {
  try {
    const notifications = await Notification.findByIdAndUpdate(req.params.id, req.body).sort({ createdAt: -1 });
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

}