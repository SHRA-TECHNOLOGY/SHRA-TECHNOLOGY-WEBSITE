import api from "../../../api/axios";


// ==========================================
// REGISTER
// ==========================================

export const register = async ({ fullName,username,number,city,email, password }) => {

  
  try {
    const res = await api.post("/api/auth/register", {
      fullName,
      username,
      number,
      city,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// LOGIN
// ==========================================

export const login = async ({ email, password }) => {
  try {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// FORGOT PASSWORD
// ==========================================

export const forgotPassword = async ({ email }) => {
  try {
    const res = await api.post("/api/auth/forgot-password", {
      email,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// RESET PASSWORD
// ==========================================

export const resetPassword = async ({ resetToken, newPassword }) => {

  try {
    const res = await api.post(
      `/api/auth/reset-password/${resetToken}`, { newPassword }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// LOGOUT
// ==========================================

export const logout = async () => {
  try {
    const res = await api.get("/api/auth/logout");

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// GET ME
// ==========================================

export const getMe = async () => {
  try {
    const res = await api.get("/api/auth/get-me");

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// GOOGLE LOGIN
// ==========================================

export const googleLogin = async (data) => {
  try {
    const res = await api.post("/api/auth/google", data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};