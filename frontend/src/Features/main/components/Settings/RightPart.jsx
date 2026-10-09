import React from "react";
import AccountSettings from "./RightSection/AccountInfo";
import ChangePassword from "./RightSection/ChangePassword";
import PrivacyPanel from "./RightSection/PrivacyPanel";

const RightPart = ({ activeBtn }) => {
  return (
    <>
      {activeBtn === "Background" && (
        <section className="settings-right default-settings-right">
        </section>
      )}

      {activeBtn === "AccountSettings" && (
        <section className="settings-right">
          <AccountSettings />
        </section>
      )}

      {activeBtn === "PasswordSettings" && (
        <section className="settings-right">
          <ChangePassword />
        </section>
      )}

      {activeBtn === "PrivacySettings" && (
        <PrivacyPanel
        />
      )}
    </>
  );
};

export default RightPart;