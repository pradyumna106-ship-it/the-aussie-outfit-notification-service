import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
            index: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "ORDER",
                "PAYMENT",
                "DELIVERY",
                "PROMOTION",
                "SYSTEM",
                "SECURITY"
            ],
            default: "SYSTEM"
        },

        channel: {
            type: String,
            enum: [
                "IN_APP",
                "EMAIL",
                "SMS",
                "PUSH"
            ],
            default: "IN_APP"
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "SENT",
                "DELIVERED",
                "FAILED",
                "READ"
            ],
            default: "PENDING"
        },

        isRead: {
            type: Boolean,
            default: false
        },

        readAt: {
            type: Date
        },

        metadata: {
            type: Object,
            default: {}
        }
    },
    {
        timestamps: true
    }
);

export const Notification = mongoose.model(
    "Notification",
    notificationSchema
);