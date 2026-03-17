import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    getNotifications,
    markAsRead,
    deleteNotification
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", isAuthenticated, getNotifications);
router.put("/:id/read", isAuthenticated, markAsRead);
router.delete("/:id", isAuthenticated, deleteNotification);

export default router;