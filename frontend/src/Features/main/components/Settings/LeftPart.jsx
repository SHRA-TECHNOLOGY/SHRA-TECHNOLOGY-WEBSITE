import React, { useEffect, useState } from "react";
import { settingsData } from "../../../../Data/Settings/LeftPartData";
import { FiChevronRight } from "react-icons/fi";

import {
    useNotificationPreference,
    useUpdateNotificationPreference,
} from "../../Hooks/Notification/useNotification";

import "../../styles/Settings/SettingsLeft.scss";


const LeftPart = ({
    activeBtn,
    setActiveBtn
}) => {

    const [settings, setSettings] = useState(settingsData);


    // ==========================================
    // GET PREFERENCE
    // ==========================================

    const {
        data: preferenceData,
        isLoading: preferenceLoading,
        isError: preferenceError,
        error: preferenceErrorData,
    } = useNotificationPreference();


    // ==========================================
    // UPDATE PREFERENCE
    // ==========================================

    const {
        mutate: updatePreference,
        isPending: isUpdating,
    } = useUpdateNotificationPreference();


    // ==========================================
    // SYNC BACKEND VALUE
    // ==========================================

    useEffect(() => {

        if (
            typeof preferenceData?.enabled !== "boolean"
        ) {
            return;
        }


        setSettings((prev) =>
            prev.map((item) => {

                // Only toggle item
                if (item.type === "toggle") {

                    return {
                        ...item,
                        value: preferenceData.enabled,
                    };

                }

                return item;

            })
        );

    }, [preferenceData?.enabled]);


    // ==========================================
    // HANDLE TOGGLE
    // ==========================================

    const handleToggle = (id) => {


        const selectedItem = settings.find(
            (item) => item.id === id
        );


        if (!selectedItem) {
            return;
        }


        if (selectedItem.type !== "toggle") {
            return;
        }


        const newValue = !selectedItem.value;


        // ======================================
        // OPTIMISTIC UI
        // ======================================

        setSettings((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        value: newValue,
                    }
                    : item
            )
        );


        // ======================================
        // BACKEND
        // ======================================

        updatePreference(
            newValue,
            {


                onError: (error) => {


                    // Rollback

                    setSettings((prev) =>
                        prev.map((item) =>
                            item.id === id
                                ? {
                                    ...item,
                                    value:
                                        !newValue,
                                }
                                : item
                        )
                    );

                },
            }
        );

    };


    return (

        <div className="settings-card">

            {settings.map((item) => (

                <div
                    className="setting-item"
                    key={item.id}
                    onClick={() =>
                        setActiveBtn(
                            item.settingName
                        )
                    }
                >

                    <div className="left">

                        <div className="icon">
                            {item.icon}
                        </div>


                        <div className="content">

                            <h4>
                                {item.title}
                            </h4>

                            <p>
                                {item.description}
                            </p>

                        </div>

                    </div>


                    {/* ==================================
                        LINK
                    ================================== */}

                    {item.type === "link" && (

                        <FiChevronRight
                            className="arrow"
                        />

                    )}


                    {/* ==================================
                        TOGGLE
                    ================================== */}

                    {item.type === "toggle" && (

                        <label
                            className={`switch ${
                                isUpdating
                                    ? "updating"
                                    : ""
                            }`}
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <input
                                type="checkbox"

                                checked={
                                    Boolean(item.value)
                                }

                                className="checkboxed"

                                disabled={
                                    preferenceLoading ||
                                    isUpdating
                                }

                                onChange={() =>
                                    handleToggle(
                                        item.id
                                    )
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    )}

                </div>

            ))}

        </div>
    );
};


export default LeftPart;