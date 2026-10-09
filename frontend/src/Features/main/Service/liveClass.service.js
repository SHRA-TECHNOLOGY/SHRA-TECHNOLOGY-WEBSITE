import api from "../../../api/axios";


// ==========================================
// GET USER LIVE CLASSES
// ==========================================

export const getLiveClasses = async () => {

    const res = await api.get(
        "/live-classes"
    );

    return res.data;
};


// ==========================================
// GET SINGLE LIVE CLASS
// ==========================================

export const getLiveClassById = async (
    liveClassId
) => {

    const res = await api.get(
        `/live-classes/${liveClassId}`
    );

    return res.data;
};


// ==========================================
// ADMIN - CREATE LIVE CLASS
// ==========================================

export const createLiveClass = async (
    data
) => {

    const res = await api.post(
        "/admin/live-classes",
        data
    );

    return res.data;
};


// ==========================================
// ADMIN - GET ALL LIVE CLASSES
// ==========================================

export const getAllLiveClassesAdmin = async () => {

    const res = await api.get(
        "/admin/live-classes"
    );

    return res.data;
};


// =====================================================
// ADD / UPDATE RECORDING
// =====================================================

export const updateLiveClassRecording = async ({
    liveClassId,
    recordingUrl,
}) => {

    const res = await api.patch(
        `/admin/${liveClassId}/recording`,
        {
            recordingUrl,
        }
    );

    return res.data;
};