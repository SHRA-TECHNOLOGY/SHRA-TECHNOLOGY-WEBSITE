import { useState } from "react";
import "../../../styles/Settings/SettingsRight.scss";

import { useAccountSettings } from "../../../Hooks/Settings/useSettings";

const AccountSettings = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    oldEmail: "",
    newEmail: "",
    city: "",
    bio: "",
  });

  // ==========================================
  // ACCOUNT SETTINGS MUTATION
  // ==========================================

  const {
    mutate: updateAccount,
    isPending,
  } = useAccountSettings();


  // ==========================================
  // TWO WAY BINDING
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    updateAccount(formData);
  };


  return (
    <div className="account-settings">

      <h2>Account Settings</h2>

      <form onSubmit={handleSubmit}>

        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter Full Name"
          />
        </div>


        {/* Old Email */}
        <div className="form-group">
          <label>Old Email Address</label>

          <input
            type="email"
            name="oldEmail"
            value={formData.oldEmail}
            onChange={handleChange}
            placeholder="Current Email"
            readOnly
          />
        </div>


        {/* New Email */}
        <div className="form-group">
          <label>New Email Address</label>

          <input
            type="email"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleChange}
            placeholder="Enter New Email"
          />
        </div>


        {/* City */}
        <div className="form-group">
          <label>City</label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter City"
          />
        </div>


        {/* Bio */}
        <div className="form-group">
          <label>Bio</label>

          <textarea
            rows="5"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write your bio..."
          />
        </div>


        {/* Submit */}
        <button
          type="submit"
          className="save-changes"
          disabled={isPending}
        >
          {isPending
            ? "Saving..."
            : "Save Changes"}
        </button>

      </form>

    </div>
  );
};

export default AccountSettings;