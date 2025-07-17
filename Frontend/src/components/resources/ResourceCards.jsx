import React from "react";
import { FileText, CalendarIcon } from "lucide-react";
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

function ResourceCards({ resources, onView, onEdit, onDelete }) {
  const formatedDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  return (
    <>
      {resources.length === 0 ? (
        <div className="text-gray-500 text-center py-8 col-span-3">
          No resources yet. Click ‘Add Resource’ to get started!
        </div>
      ) : (
        resources.map((res) => (
          <div key={res._id} className="card bg-white rounded-xl px-3 py-3">
            <div className="flex  justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 rounded-lg p-2">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-lg">{res.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {res.resourceType} • {returnFileSize(res.size)}
                  </p>
                </div>{" "}
              </div>
              <ThreeDotsMenu
                onView={() => onView(res)}
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
                    {`Added On ` + formatedDate(res.createdAt)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-blue-100 text-blue-600 rounded px-2 py-0.5 text-xs">
                    {res.subject}
                  </span>
                  <span className="bg-gray-100 text-gray-600 rounded px-2 py-0.5 text-xs">
                    {res.resourceType}
                  </span>
                </div>
              </div>
              {/* Download action */}
              <a
                href={`${res.fileUrl || res.link}`}
                className="text-green-500 font-medium text-sm hover:underline"
                target="_blank"
              >
                Download
              </a>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default ResourceCards;
