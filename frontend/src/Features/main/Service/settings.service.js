import api from "../../../api/axios";


// ==========================================
// ACCOUNT SETTINGS
// ==========================================

export const accountSettings = async (data) => {
  try {
    const res = await api.post("/account-settings", data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// PASSWORD SETTINGS
// ==========================================

export const passwordSettings = async (data) => {
  try {
    const res = await api.post("/password-settings", data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};