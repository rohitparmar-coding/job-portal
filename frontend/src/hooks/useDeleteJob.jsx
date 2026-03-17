import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";

const deleteJob = async (id) => {
  try {
    const res = await axios.delete(
      `${JOB_API_END_POINT}/delete-job/${id}`,
      { withCredentials: true }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      window.location.reload(); // simple refresh
    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Delete failed");
  }
};

export default deleteJob;