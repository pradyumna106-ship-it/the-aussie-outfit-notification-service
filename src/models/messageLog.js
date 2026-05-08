import mongoose from "mongoose";

const messageLogSchema = new mongoose.Schema(
    {
        notificationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notification",
            required: true,
            index: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        recipient: {
            type: String,
            required: true,
            trim: true
        },

        channel: {
            type: String,
            enum: [
                "EMAIL",
                "SMS",
                "PUSH",
                "IN_APP"
            ],
            required: true
        },

        subject: {
            type: String,
            trim: true
        },

        messageBody: {
            type: String,
            required: true
        },

        provider: {
            type: String,
            trim: true
        },

        providerMessageId: {
            type: String,
            trim: true
        },

        deliveryStatus: {
            type: String,
            enum: [
                "PENDING",
                "SENT",
                "DELIVERED",
                "FAILED"
            ],
            default: "PENDING"
        },

        failureReason: {
            type: String,
            trim: true
        },

        sentAt: {
            type: Date
        },

        deliveredAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

export const MessageLog = mongoose.model(
    "MessageLog",
    messageLogSchema
);