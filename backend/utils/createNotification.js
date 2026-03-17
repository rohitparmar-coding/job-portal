import { Notification } from "../models/notificationModel.js";

export const createNotification = async ({
    receiver,
    sender,
    title,
    message,
    type
}) => {
    await Notification.create({
        receiver,
        sender,
        title,
        message,
        type
    });
};