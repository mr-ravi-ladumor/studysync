import React, { useState } from "react";
import SettingsNav from "../components/setting/SettingsNav.jsx";
import Account from "../components/setting/Account.jsx";
import Password from "../components/setting/Password.jsx";

function Settings() {
    const [active, setActive] = useState("Account");
    return (
        <div>
            <div className=" flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-medium">Settings</h3>
                    <p className="text-gray-600 text-medium">
                        Customize your account and application preferences.
                    </p>
                </div>
            </div>
            <div className="flex gap-5 mt-5 ">
                <div className="settingsNav">
                    <SettingsNav active={active} setActive={setActive} />
                </div>
                <div className="settingPage flex-1">
                    {active === "Account" && <Account />}
                    {active === "Change Password" && <Password />}
                </div>
            </div>
        </div>
    );
}

export default Settings;
