import { Notification } from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.id;

        const notifications = await Notification.find({ receiver: userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {
        res.status(500).json({ success: false });
    }
};


export const markAsRead = async (req, res) => {
    try {
        const id = req.params.id;

        await Notification.findByIdAndUpdate(id, { read: true });

        res.status(200).json({ success: true });

    } catch (error) {
        res.status(500).json({ success: false });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const id = req.params.id;
        await Notification.findByIdAndDelete(id);

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};