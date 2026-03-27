import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    markNotificationRead,
    deleteNotificationFromState
} from "@/redux/notificationSlice.js";
import Navbar from "./shared/Navbar.jsx";

const API = import.meta.env.VITE_API_URL;

const NotificationPage = () => {
    const dispatch = useDispatch();

    const notifications = useSelector(
        (store) => store.notification?.notifications || []
    );

    console.log(notifications)
    const handleMarkRead = async (id) => {
        await axios.put(
            `${API}/api/v1/notification/${id}/read`,
            {},
            { withCredentials: true }
        );

        dispatch(markNotificationRead(id));
    };

    const handleDelete = async (id) => {
        await axios.delete(
            `${API}/api/v1/notification/${id}`,
            { withCredentials: true }
        );

        dispatch(deleteNotificationFromState(id));
    };

    return (
        <>
            <Navbar />

            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Notifications</h1>

                {notifications.length === 0 ? (
                    <p className="text-gray-500">
                        No notifications found.
                    </p>
                ) : (
                    notifications.map((n) => (
                        <div
                            key={n._id}
                            className={`p-4 rounded-lg mb-3 shadow flex justify-between items-start ${
                                n.read ? "bg-gray-100" : "bg-indigo-100"
                            }`}
                        >
                            <div>
                                <h2 className="font-semibold">
                                    {n.title}
                                </h2>
                                <p className="text-sm">{n.message}</p>
                            </div>

                            <div className="flex gap-2">
                                {!n.read && (
                                    <button
                                        onClick={() =>
                                            handleMarkRead(n._id)
                                        }
                                        className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                                    >
                                        Mark Read
                                    </button>
                                )}

                                <button
                                    onClick={() =>
                                        handleDelete(n._id)
                                    }
                                    className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default NotificationPage;