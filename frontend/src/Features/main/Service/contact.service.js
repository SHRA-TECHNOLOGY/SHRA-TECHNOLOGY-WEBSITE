import api from "../../../api/axios";

// ==========================================
// ADD CONTACT DETAILS
// ==========================================

export const addContactDetails = async (contactData) => {
  try {
    const res = await api.post("/contact",  contactData );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// FETCH ALL CONTACT DETAILS
// ==========================================

export const getAllContactDetails = async () => {
  try {
    const res = await api.get("/fetch-contacts");

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};