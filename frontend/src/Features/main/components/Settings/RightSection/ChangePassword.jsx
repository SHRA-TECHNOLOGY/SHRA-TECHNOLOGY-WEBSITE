import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  Circle,
  CheckCircle2,
} from "lucide-react";

import { usePasswordSettings } from "../../../Hooks/Settings/useSettings";

const ChangePassword = () => {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });


  // ==========================================
  // PASSWORD MUTATION
  // ==========================================

  const {
    mutate: updatePassword,
    isPending,
  } = usePasswordSettings();


  // ==========================================
  // PASSWORD VALIDATION
  // ==========================================

  const hasMinLength = newPassword.length >= 8;

  const hasUpperCase =
    /[A-Z]/.test(newPassword);

  const hasLowerCase =
    /[a-z]/.test(newPassword);

  const hasNumberOrSymbol =
    /[\d!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  const isValidPassword =
    hasMinLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumberOrSymbol;


  // ==========================================
  // SHOW / HIDE PASSWORD
  // ==========================================

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };


  // ==========================================
  // SUBMIT PASSWORD
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Empty fields
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return;
    }

    // Strong password validation
    if (!isValidPassword) {
      return;
    }

    // Password matching
    if (newPassword !== confirmPassword) {
      return;
    }

    const passwordData = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    updatePassword(passwordData, {
      onSuccess: () => {

        // Clear form after success
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      },
    });
  };


  return (
    <div className="change-password-card">

      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>

        {/* Current Password */}

        <div className="form-group">

          <label>
            Current Password
          </label>

          <div className="password-input">

            <input
              type={
                showPassword.current
                  ? "text"
                  : "password"
              }
              name="currentPassword"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              placeholder="Enter Current Password"
              required
            />

            <button
              type="button"
              onClick={() =>
                togglePassword("current")
              }
            >
              {showPassword.current
                ? <FiEyeOff />
                : <FiEye />
              }
            </button>

          </div>

        </div>


        {/* New Password */}

        <div className="form-group">

          <label>
            New Password
          </label>

          <div className="password-input">

            <input
              type={
                showPassword.new
                  ? "text"
                  : "password"
              }
              name="newPassword"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder="Enter New Password"
              required
            />

            <button
              type="button"
              onClick={() =>
                togglePassword("new")
              }
            >
              {showPassword.new
                ? <FiEyeOff />
                : <FiEye />
              }
            </button>

          </div>

        </div>


        {/* Confirm Password */}

        <div className="form-group">

          <label>
            Confirm Password
          </label>

          <div className="password-input">

            <input
              type={
                showPassword.confirm
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm New Password"
              required
            />

            <button
              type="button"
              onClick={() =>
                togglePassword("confirm")
              }
            >
              {showPassword.confirm
                ? <FiEyeOff />
                : <FiEye />
              }
            </button>

          </div>

        </div>


        {/* Password Instructions */}

        <div className="instructionForPassword">

          <h3>
            Password must contain:
          </h3>

          <div className="instruction-section">

            <PasswordRule
              valid={hasMinLength}
              text="At least 8 characters"
            />

            <PasswordRule
              valid={hasUpperCase}
              text="One uppercase letter"
            />

            <PasswordRule
              valid={hasLowerCase}
              text="One lowercase letter"
            />

            <PasswordRule
              valid={hasNumberOrSymbol}
              text="One number or symbol"
            />

          </div>

        </div>


        {/* Submit */}

        <button
          className="save-btn"
          type="submit"
          disabled={isPending}
        >
          {isPending
            ? "Updating..."
            : "Update Password"
          }
        </button>

      </form>

    </div>
  );
};


// ==========================================
// PASSWORD RULE COMPONENT
// ==========================================

const PasswordRule = ({
  valid,
  text,
}) => {

  return (
    <div className="instruction">

      {valid ? (
        <CheckCircle2
          size={18}
          color="#ff2d75"
        />
      ) : (
        <Circle
          size={18}
          color="#8b93a7"
        />
      )}

      <p>{text}</p>

    </div>
  );
};


export default ChangePassword;