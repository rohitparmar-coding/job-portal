import { Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
    const navigate = useNavigate();

    const notifications = useSelector(
        (store) => store.notification?.notifications || []
    );

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div
            onClick={() => navigate("/notifications")}
            className="relative cursor-pointer hover:scale-110 transition"
        >
            <Bell className="w-6 h-6 text-white hover:text-indigo-600" />
            {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                </span>
            )}
        </div>
    );
};

export default NotificationBell;