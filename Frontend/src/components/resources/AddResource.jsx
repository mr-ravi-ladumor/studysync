import React, { useState } from "react";
// ✅ Use this
export const allowedExtensions = [
  "pdf", "doc", "docx", "ppt", "pptx", "txt",
  "jpg", "jpeg", "png"
];

export const allowedMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'image/jpeg',
  'image/png'
];


const subjectsList = [
  "Computer Science",
  "Programming",
  "Machine Learning",
  "Mathematics",
  "English",
  "Other",
];

function AddResource({ setShowAddResource }) {
  const [resource, setResource] = useState({
    title: "",
    resourceType: "",
    subject: "",
    customSubject: "",
    link: "",
    file: null,
  });
  const [error, setError] = useState("");

  const onSubmitAddResource = async (e) => {
    e.preventDefault();

    function validateResource() {
      const { title, resourceType, subject, link, file, customSubject } =
        resource;

      // Required fields
      if (!title || !resourceType || !subject) {
        setError("Please fill in all required fields.");
        return false;
      }

      // Link validation
      if (resourceType === "link") {
        if (!link) {
          setError("Please provide a valid link.");
          return false;
        }
        console.log(link);
        try {
          new URL(link);
        } catch {
          console.log("Invalid URL format:", link);
          setError("Please enter a valid URL.");
          return false;
        }
      }

      // File validation
      if (resourceType !== "link") {
        if (!file) {
          setError("Please upload a file.");
          return false;
        }
        if (file.size > 10 * 1024 * 1024) {
          setError("File size must be less than 10MB.");
          return false;
        }
        // Extension and MIME type check
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

      // Custom subject
      if (subject === "Other" && !customSubject) {
        setError("Please provide a subject name.");
        return false;
      }

      setError("");
      return true;
    }
    if (!validateResource()) return;
    console.log("Resource data to be submitted:", resource);

    const formData = new FormData();

    formData.append("title", resource.title);
    formData.append("resourceType", resource.resourceType);
    formData.append(
      "subject",
      resource.subject === "Other" ? resource.customSubject : resource.subject
    );

    if (resource.resourceType === "link") {
      formData.append("link", resource.link);
    } else {
      formData.append("file", resource.file);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/resources`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const resourceData = await response.json();
      if (!response.ok) {
        console.error("Error adding resource:", resourceData.message);
        setError(resourceData.message || "Failed to add resource.");
        return;
      }

      setShowAddResource(false);
      setResource({
        title: "",
        resourceType: "",
        subject: "",
        customSubject: "",
        link: "",
        file: null,
      });
      setError("");
      console.log("Resource added successfully:", resourceData.data);
    } catch (error) {
      console.error("newtork ! Error adding resource:", error);
      setError("Failed to add resource. Please try again.");
      return;
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 mx-auto w-full max-w-md ">
          <h3 className="text-xl  mb-2">Add New Resource</h3>
          <p className="text-gray-600 mb-6 border-b pb-5 border-gray-300">
            Please fill in the details of your new resource below.
          </p>

          <form className="flex flex-col gap-2" encType="multipart/form-data">
            {error && (
              <span className="text-sm text-red-600 font-medium mb-2">
                {error}
              </span>
            )}
            {/* Resource Title */}
            <div className="flex flex-col gap-1">
              <label htmlFor="resource-title" className="block ">
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
                className="w-full mb-3 px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Resource Type */}
            <div className="flex flex-col gap-1">
              <label htmlFor="resource-type" className="block ">
                Resource Type
              </label>
              <select
                id="resource-type"
                className="w-full mb-3 px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            {/* Subject */}
            <div className="flex flex-col gap-1">
              <label htmlFor="resource-subject" className="block ">
                Subject
              </label>
              <select
                id="resource-subject"
                className="w-full mb-3 px-3 py-2 border overflow-y-scroll rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full mb-3 px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={resource.customSubject}
                  onChange={(e) => {
                    setResource({ ...resource, customSubject: e.target.value });
                    setError("");
                  }}
                  required
                />
              )}
            </div>
            {/* Resource Link or File Upload */}
            <div className="flex flex-col gap-1">
              {resource.resourceType === "link" ? (
                <>
                  <label htmlFor="resource-link" className="block ">
                    Resource Link
                  </label>
                  <input
                    id="resource-link"
                    type="url"
                    placeholder="Enter Resource Link"
                    className="w-full mb-3 px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  <label htmlFor="resource-file" className="block ">
                    Upload File
                  </label>
                  <label
                    htmlFor="resource-file"
                    className="w-full flex flex-col items-center justify-center p-6 mb-3 border-2 border-dashed border-gray-400 rounded cursor-pointer hover:bg-gray-50 transition"
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
                            // 10MB
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
                      required
                    />{" "}
                  </label>
                  {resource.file && (
                    <span className="text-sm text-gray-600">
                      {resource.file.name}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddResource(false)}
                className="px-4 py-2 rounded  text-gray-700 hover:bg-gray-200
                        transition-colors duration-300 "
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmitAddResource}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 shadow-lg"
              >
                Add Resource
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddResource;
