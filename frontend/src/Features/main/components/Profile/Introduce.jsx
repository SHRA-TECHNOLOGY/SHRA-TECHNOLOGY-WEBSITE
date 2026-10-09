import React from "react";
import { Pencil } from "lucide-react";
import IMG from "../../../../assets/sonu-img.png";
import { useUpdateProfileImage } from "../../Hooks/Profile/useProfile";

const Introduce = ({ profileData }) => {

    const {
        mutate: updateProfileImage,
        isPending: imageUploading
    } = useUpdateProfileImage();


    // ==========================================
    // HANDLE PROFILE IMAGE CHANGE
    // ==========================================

    const handleProfileImageChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;


        // Image type check
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }


        // 5MB size check
        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5MB.");
            return;
        }


        updateProfileImage(file);
    };


    return (

        <section className="profile-intro">

            {/* ==========================================
                PROFILE IMAGE
            ========================================== */}

            <div className="logo-section">

                <div className="user-logo">
                    <img
                        src={profileData?.avatar || IMG}
                        alt={profileData?.name || "Profile"}
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                            objectFit: "cover"
                        }}
                    />
                </div>


                {/* ==========================================
                    EDIT PROFILE IMAGE
                ========================================== */}

                <label
                    htmlFor="profile-image-upload"
                    className={`editIcon-logo ${imageUploading ? "uploading" : ""}`}
                    title="Change profile picture"
                >

                    {imageUploading ? (
                        <span className="image-upload-spinner"></span>
                    ) : (
                        <Pencil size={16} />
                    )}

                </label>


                <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    hidden
                    onChange={handleProfileImageChange}
                    disabled={imageUploading}
                />

            </div>


            {/* ==========================================
                USER DATA
            ========================================== */}

            <div className="profile-data">


                {/* ==========================================
                    TITLE
                ========================================== */}

                <div className="title-section">

                    <h3>
                        {profileData?.name || "User"}
                    </h3>

                    <span>
                        {profileData?.role || "Student"}
                    </span>

                </div>


                {/* ==========================================
                    BASIC DETAILS
                ========================================== */}

                <div className="basic-details">

                    <p>
                        <strong>Email :</strong>{" "}
                        {profileData?.email || "Not available"}
                    </p>


                    <p>
                        <strong>Mob.:</strong>{" "}
                        {profileData?.phone || "Not available"}
                    </p>


                    <p>
                        <strong>City :</strong>{" "}
                        {profileData?.city || "Not available"}
                    </p>


                    <p>
                        <strong>Joined :</strong>{" "}

                        {profileData?.joinedDate
                            ? new Date(
                                profileData.joinedDate
                            ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })
                            : "Not available"
                        }

                    </p>

                </div>


                {/* ==========================================
                    BIO
                ========================================== */}

                <div className="user-bio">

                    <p>
                        {profileData?.bio || "No bio available."}
                    </p>

                </div>

            </div>

        </section>

    );
};

export default Introduce;