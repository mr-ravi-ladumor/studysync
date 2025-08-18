import React, { useState } from "react";

function DangerZone() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        if (confirmText !== "DELETE") {
            setDeleteError("Please type DELETE to confirm");
            return;
        }

        setIsDeleting(true);
        setDeleteError("");
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/delete`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to delete account");
            }

            // Handle successful deletion : Todo
        } catch (error) {
            setDeleteError(error.message || "Failed to delete account");
            setIsDeleting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Danger Zone
            </h3>

            <div className="space-y-4">
                <div className="flex flex-col gap-4">
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="text-red-700 font-semibold">
                            ⚠️ Delete Account
                        </div>

                        <p className="px-7 py-2 text-red-600 text-[15px]">
                            Once you delete your account, all of your data will
                            be permanently removed. This action cannot be
                            undone.
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            If you are sure, open the confirmation dialog and
                            type <span className="font-semibold">DELETE</span>.
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-white border border-red-500 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md font-medium"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg w-full max-w-lg p-6">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Delete Account
                            </h3>
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setConfirmText("");
                                    setDeleteError("");
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mt-4 text-gray-600">
                            <p className="mb-4">
                                Are you sure you want to delete your account?
                                This action cannot be undone. All of your data
                                will be permanently deleted.
                            </p>

                            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                                <div className="text-red-700 font-semibold">
                                    You will lose all your data, including:
                                </div>
                                <ul className="list-disc ml-5 mt-2 text-red-600">
                                    <li>Saved tasks</li>
                                    <li>Saved resources and documents</li>
                                    <li>Calendar events and schedules</li>
                                </ul>
                            </div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type{" "}
                                <span className="font-semibold">DELETE</span> to
                                confirm
                            </label>
                            <input
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3"
                                placeholder="Type DELETE"
                            />

                            {deleteError && (
                                <div className="text-sm text-red-600 mb-2">
                                    {deleteError}
                                </div>
                            )}

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setConfirmText("");
                                        setDeleteError("");
                                    }}
                                    className="bg-white border border-gray-300 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={
                                        confirmText !== "DELETE" || isDeleting
                                    }
                                    onClick={handleDeleteAccount}
                                    className={`px-4 py-2 rounded-md font-medium ${
                                        confirmText === "DELETE" && !isDeleting
                                            ? "bg-red-600 text-white hover:bg-red-700"
                                            : "bg-red-200 text-red-700 cursor-not-allowed"
                                    }`}
                                >
                                    {isDeleting
                                        ? "Deleting..."
                                        : "Delete Account"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DangerZone;
