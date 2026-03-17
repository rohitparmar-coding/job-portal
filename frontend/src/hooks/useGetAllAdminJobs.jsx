import { setAllAdminJobs } from '@/redux/jobSlice.js'
import { JOB_API_END_POINT } from '@/utils/constant.js'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {

        // 🔥 If no user → clear jobs immediately
        if (!user) {
            dispatch(setAllAdminJobs([]));
            return;
        }

        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/getadminjobs`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                } else {
                    dispatch(setAllAdminJobs([]));
                }

            } catch (error) {
                console.log(error);
                dispatch(setAllAdminJobs([])); // safety clear
            }
        };

        fetchAllAdminJobs();

    }, [user, dispatch]);
};

export default useGetAllAdminJobs;