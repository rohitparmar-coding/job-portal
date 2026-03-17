import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNotifications } from "@/redux/notificationSlice.js";

const useFetchNotifications = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/v1/notification",
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setNotifications(res.data.notifications || []));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchNotifications();
    }, []);
};

export default useFetchNotifications;