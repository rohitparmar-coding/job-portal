import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice.js";

const useLoadUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setUser(res.data.user));
                }
            } catch (error) {
                dispatch(setUser(null));
            }
        };

        fetchUser();
    }, [dispatch]);
};

export default useLoadUser;