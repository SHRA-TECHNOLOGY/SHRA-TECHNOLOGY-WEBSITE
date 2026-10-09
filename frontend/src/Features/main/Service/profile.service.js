import api from "../../../api/axios";
import axios from "axios";

// ==========================================
// GET PROFILE DASHBOARD
// ==========================================

export const getProfileDashboard = async () => {
  try {
    const res = await api.get("/profile-data");

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//==========================================
// UPDATE PROFILE IMAGE
// ==========================================

export const updateProfileImage = async (file) => {
  const formData = new FormData();

  formData.append("profileImage", file);

  console.log("FILE:", file);
  console.log("FORM DATA:", formData.get("profileImage"));

  const res = await axios.post(
    "http://localhost:3000/account/profile-image",
    formData,
    {
      withCredentials: true,
    },
  );

  return res.data;
};
