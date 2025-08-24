import React from "react";

function formatDate(date) {
    try {
        return new Date(date).toLocaleString();
    } catch {
        return "";
    }
}

function formatSize(bytes) {
    if (typeof bytes !== "number" || isNaN(bytes)) return "N/A";
    if (bytes < 1e3) return `${bytes} B`;
    if (bytes < 1e6) return `${(bytes / 1e3).toFixed(1)} KB`;
    return `${(bytes / 1e6).toFixed(1)} MB`;
}

export default function ViewResource({ resource, onClose }) {
    if (!resource) return null;

    const isLink =
        resource.resourceType === "link" || resource.mimeType === "link/url";
    const href = isLink ? resource.link : resource.fileUrl;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 mx-auto w-full max-w-lg shadow-xl">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold">Resource Details</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-2 text-sm text-gray-700">
                    <div>
                        <span className="font-medium">Title:</span>{" "}
                        {resource.title}
                    </div>
                    <div>
                        <span className="font-medium">Subject:</span>{" "}
                        {resource.subject}
                    </div>
                    <div>
                        <span className="font-medium">Type:</span>{" "}
                        {resource.resourceType}
                    </div>
                    <div>
                        <span className="font-medium">Size:</span>{" "}
                        {formatSize(resource.size)}
                    </div>
                    <div>
                        <span className="font-medium">Added:</span>{" "}
                        {formatDate(resource.createdAt)}
                    </div>
                    {isLink ? (
                        <div className="truncate">
                            <span className="font-medium">Link:</span>{" "}
                            {resource.link}
                        </div>
                    ) : (
                        <div className="truncate">
                            <span className="font-medium">File URL:</span>{" "}
                            {resource.fileUrl}
                        </div>
                    )}
                </div>

                <div className="mt-5 flex justify-end gap-2">
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                        {isLink ? "Open Link" : "Open File"}
                    </a>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
