import React, { useState } from "react";

const allowedExtensions = [
  "pdf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "txt",
  "jpg",
  "jpeg",
  "png",
];

const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "image/jpeg",
  "image/png",
];

const subjectsList = [
  "Computer Science",
  "Programming",
  "Machine Learning",
  "Mathematics",
  "English",
  "Other",
];

function EditResource({
  resourceData,
  setResources,
  setShowEditResource,
  setSelectedResource,
}) {
  const [resource, setResource] = useState({
    title: resourceData.title,
    resourceType: resourceData.resourceType,
    subject: resourceData.subject,
    customSubject: "",
    link: resourceData.link || "",
    file: null,
  });
  const [error, setError] = useState("");

  const onSubmitEditResource = async (e) => {
    e.preventDefault();

    function validateResource() {
      const { title, resourceType, subject, link, file, customSubject } =
        resource;

      if (!title || !resourceType || !subject) {
        setError("Please fill in all required fields.");
        return false;
      }

      if (resourceType === "link") {
        if (!link) {
          setError("Please provide a valid link.");
          return false;
        }
        try {
          new URL(link);
        } catch {
          setError("Please enter a valid URL.");
          return false;
        }
      }

      if (resourceType !== "link" && file) {
        if (file.size > 10 * 1024 * 1024) {
          setError("File size must be less than 10MB.");
          return false;
        }
        const ext = file.name.split(".").pop().toLowerCase();
        if (
          !allowedExtensions.includes(ext) ||
          (file.type && !allowedMimeTypes.includes(file.type))
        ) {
          setError(
            "File type not allowed. Allowed: pdf, doc, docx, jpg, jpeg, png, txt."
          );
          return false;
        }
      }

      if (subject === "Other" && !customSubject) {
        setError("Please provide a subject name.");
        return false;
      }

      setError("");
      return true;
    }

    if (!validateResource()) return;

    const formData = new FormData();
    formData.append("title", resource.title);
    formData.append("resourceType", resource.resourceType);
    formData.append(
      "subject",
      resource.subject === "Other" ? resource.customSubject : resource.subject
    );

    if (resource.resourceType === "link") {
      formData.append("link", resource.link);
    } else if (resource.file) {
      formData.append("file", resource.file);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/resources/update/${
          resourceData._id
        }`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const updatedResource = await response.json();
        // console.log("Updated Resource:", updatedResource);
      if (!response.ok) {
        throw new Error(updatedResource.message || "Failed to update resource");
      }

      setShowEditResource(false);
      setSelectedResource(null);
      setResources((prevResources) =>
        prevResources.map((res) =>
          res._id === updatedResource.data._id ? updatedResource.data : res
        )
      );

      alert("Resource updated successfully!");
    } catch (error) {
      console.error("Error updating resource:", error);
      alert("Failed to update resource. Please try again.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-xl p-6 mx-auto w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
          <h3 className="text-xl mb-2">Edit Resource</h3>
          <p className="text-gray-600 mb-6 border-b pb-5 border-gray-300">
            Please update the details of your resource below.
          </p>

          <form className="flex flex-col gap-2" encType="multipart/form-data">
            {error && (
              <span className="text-sm text-red-600 font-medium mb-2">
                {error}
              </span>
            )}

            <div className="flex flex-col w-full mb-2">
              <label htmlFor="resource-title" className="form-label">
                Resource Title
              </label>
              <input
                id="resource-title"
                type="text"
                name="resourceTitle"
                value={resource.title}
                onChange={(e) => {
                  setResource({ ...resource, title: e.target.value });
                  setError("");
                }}
                placeholder="Enter Resource Title..."
                required
                className="form-input"
              />
            </div>

            <div className="flex flex-col w-full mb-2">
              <label htmlFor="resource-type" className="form-label">
                Resource Type
              </label>
              <select
                id="resource-type"
                className="form-input"
                value={resource.resourceType}
                onChange={(e) => {
                  setResource({ ...resource, resourceType: e.target.value });
                  setError("");
                }}
                required
              >
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="image">Image</option>
                <option value="link">Link</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col w-full mb-2">
              <label htmlFor="resource-subject" className="form-label">
                Subject
              </label>
              <select
                id="resource-subject"
                className="form-input mb-3 overflow-y-scroll"
                value={resource.subject}
                onChange={(e) => {
                  setResource({ ...resource, subject: e.target.value });
                  setError("");
                }}
                required
              >
                <option value="">Select Subject</option>
                {subjectsList.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              {resource.subject === "Other" && (
                <input
                  type="text"
                  placeholder="Enter Subject Name"
                  className="form-input"
                  value={resource.customSubject}
                  onChange={(e) => {
                    setResource({ ...resource, customSubject: e.target.value });
                    setError("");
                  }}
                  required
                />
              )}
            </div>

            <div className="flex flex-col w-full mb-2">
              {resource.resourceType === "link" ? (
                <>
                  <label htmlFor="resource-link" className="form-label">
                    Resource Link
                  </label>
                  <input
                    id="resource-link"
                    type="url"
                    placeholder="Enter Resource Link"
                    className="form-input"
                    value={resource.link}
                    onChange={(e) => {
                      setResource({ ...resource, link: e.target.value });
                      setError("");
                    }}
                    required
                  />
                </>
              ) : (
                <>
                  <label htmlFor="resource-file" className="form-label">
                    Upload New File (Optional)
                  </label>
                  <div className="text-xs text-gray-400 mb-2 font-medium">
                    Current: {resourceData.originalFileName || "No file"}
                  </div>
                  <label
                    htmlFor="resource-file"
                    className="w-full flex flex-col items-center justify-center p-6 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-white hover:border-[#22c55e] transition-all duration-300"
                  >
                    <span className="text-gray-500">
                      Click to <span className="text-green-500">upload</span> or
                      drag & drop a file
                    </span>
                    <span className="text-[12px] text-gray-500">
                      pdf, docx, jpg, jpeg, png, txt up to 10 MB
                    </span>
                    <input
                      id="resource-file"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,image/*,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (file.size > 10 * 1024 * 1024) {
                            setError("File size must be less than 10MB.");
                            setResource({ ...resource, file: null });
                          } else {
                            setError("");
                            setResource({ ...resource, file });
                          }
                        } else {
                          setError("");
                          setResource({ ...resource, file: null });
                        }
                      }}
                    />
                  </label>
                  {resource.file && (
                    <span className="text-sm text-gray-600">
                      New file: {resource.file.name}
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowEditResource(false)}
                className="btn-secondary px-5 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmitEditResource}
                className="btn-primary px-5 py-2 text-sm"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditResource;
