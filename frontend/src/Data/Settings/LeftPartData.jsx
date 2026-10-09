import {
    FiUser,
    FiLock,
    FiBell,
    FiMoon,
    FiGlobe,
    FiShield,
} from "react-icons/fi";

export const settingsData = [
    {
        id: 1,
        title: "Account Settings",
        description: "Update your personal information",
        icon: <FiUser />,
        type: "link",
        settingName:"AccountSettings"
    },
    {
        id: 2,
        title: "Password",
        description: "Change your password",
        icon: <FiLock />,
        type: "link",
        settingName:"PasswordSettings"
    },
    {
        id: 3,
        title: "Notifications",
        description: "Manage your notification preferences",
        icon: <FiBell />,
        type: "toggle",
        value: true,
        settingName:"NotificationSettings"
    },
    {
        id: 4,
        title: "Privacy",
        description: "Manage your privacy settings",
        icon: <FiShield />,
        type: "link",
        settingName:"PrivacySettings"
    },
];