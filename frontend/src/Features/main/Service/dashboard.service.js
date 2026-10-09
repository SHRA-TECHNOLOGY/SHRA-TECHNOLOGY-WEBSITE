import api from "../../../api/axios";

export const getDashboard = async () => {
  try {
    const res = await api.post("/get-dashboard");
    return res.data;
  } catch (error) {
    console.log("Dashboard API Error:", error);
    throw error;
  }
};