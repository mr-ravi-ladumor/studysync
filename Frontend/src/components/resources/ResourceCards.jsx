import React from "react";
import {
    FileText,
    File as FileIcon,
    Image as ImageIcon,
    Link as LinkIcon,
    Calendar as CalendarIcon,
} from "lucide-react";
import ThreeDotsMenu from "../utility/ThreeDotsMenu.jsx";

function returnFileSize(number) {
    if (typeof number !== "number" || isNaN(number)) {
        return "N/A";
    }
    if (number < 1e3) {
        return `${number} bytes`;
    } else if (number >= 1e3 && number < 1e6) {
        return `${(number / 1e3).toFixed(1)} KB`;
    }
    return `${(number / 1e6).toFixed(1)} MB`;
}

function ResourceCards({ resources, onViewDetails, onEdit, onDelete, isLoading }) {
    const themeForType = (type) => {
        switch ((type || "").toLowerCase()) {
            case "document":
                return {
                    icon: FileText,
                    iconBg: "bg-blue-100",
                    iconText: "text-blue-600",
                    subjectBg: "bg-blue-100",
                    subjectText: "text-blue-700",
                    typeBg: "bg-blue-50",
                    typeText: "text-blue-600",
                };
            case "image":
                return {
                    icon: ImageIcon,
                    iconBg: "bg-pink-100",
                    iconText: "text-pink-600",
                    subjectBg: "bg-pink-100",
                    subjectText: "text-pink-700",
                    typeBg: "bg-pink-50",
                    typeText: "text-pink-600",
                };
            case "link":
                return {
                    icon: LinkIcon,
                    iconBg: "bg-green-100",
                    iconText: "text-green-600",
                    subjectBg: "bg-green-100",
                    subjectText: "text-green-700",
                    typeBg: "bg-green-50",
                    typeText: "text-green-600",
                };
            case "other":
            default:
                return {
                    icon: FileIcon,
                    iconBg: "bg-orange-100",
                    iconText: "text-orange-600",
                    subjectBg: "bg-orange-100",
                    subjectText: "text-orange-700",
                    typeBg: "bg-orange-50",
                    typeText: "text-orange-600",
                };
        }
    };
    const formatedDate = (date) =>
        new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    return (
        <>
            {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl px-3 py-3 animate-pulse border border-gray-100 shadow-sm">
                        <div className="flex justify-between mb-2">
                            <div className="flex items-center gap-3 w-full">
                                <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                </div>
                            </div>
                        </div>
                        <div className="h-px w-full bg-gray-100 my-4"></div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                <div className="flex gap-2">
                                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))
            ) : resources.length === 0 ? (
                <div className="text-gray-500 text-center py-8 col-span-3">
                    No resources yet. Click ‘Add Resource’ to get started!
                </div>
            ) : (
                resources.map((res) => {
                    const theme = themeForType(res.resourceType);
                    const Icon = theme.icon;
                    return (
                        <div
                            key={res._id}
                            className={`card bg-white rounded-xl px-3 py-3 `}
                        >
                            <div className="flex  justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`${theme.iconBg} ${theme.iconText} rounded-lg p-2`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {res.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            {res.resourceType} •{" "}
                                            {returnFileSize(res.size)}
                                        </p>
                                    </div>{" "}
                                </div>
                                <ThreeDotsMenu
                                    onViewDetails={() => onViewDetails(res)}
                                    onEdit={() => onEdit(res)}
                                    onDelete={() => onDelete(res._id)}
                                />
                            </div>
                            <div className="h-px w-full bg-gray-200 my-4"></div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-gray-400 text-sm">
                                            <CalendarIcon className="h-3 w-3" />
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            {`Added On ` +
                                                formatedDate(res.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span
                                            className={`${theme.subjectBg} ${theme.subjectText} rounded px-2 py-0.5 text-xs`}
                                        >
                                            {res.subject}
                                        </span>
                                        <span
                                            className={`bg-gray-100 text-gray-600 rounded px-2 py-0.5 text-xs`}
                                        >
                                            {res.resourceType}
                                        </span>
                                    </div>
                                </div>
                                {/* Open action */}
                                <a
                                    href={`${res.fileUrl || res.link}`}
                                    className="text-green-500 font-medium text-sm hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {res.resourceType === "link"
                                        ? "Open Link"
                                        : "View"}
                                </a>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
}

export default ResourceCards;
