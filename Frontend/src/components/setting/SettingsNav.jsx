import React from "react";

function SettingsNav({ active, setActive }) {
    const options = [
        { key: 1, value: "Account" },
        { key: 2, value: "Change Password" },
    ];
    return (
        <div className="sticky top-1">
            <ul className="w-64 bg-white rounded-lg flex flex-col">
                {options.map((option) => (
                    <li key={option.key}>
                        <button
                            onClick={() => setActive(option.value)}
                            className={`w-full text-left px-4 py-3
              ${
                  active === option.value
                      ? "text-green-600 border-l-4 border-green-500 font-medium bg-green-50"
                      : "text-gray-600 hover:bg-gray-100 border-l-4 border-transparent hover:border-gray-300 "
              }
              ${option.key === 1 ? "rounded-t-lg overflow-hidden" : ""}
              ${
                  option.key === options.length
                      ? "rounded-b-lg overflow-hidden"
                      : ""
              }
              `}
                        >
                            {option.value}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SettingsNav;
