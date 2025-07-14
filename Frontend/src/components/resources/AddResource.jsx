import React, { useState } from "react";

function AddResource({ setShowAddResource }) {
  const [resource, setResource] = useState({
    title: "",
    resourceType: "",
    subject: "",
    customSubject: "",
    link: "",
    file: null,
  });

  const subjectsList = [
    "Computer Science",
    "Programming",
    "Machine Learning",
    "Mathematics",
    "English",
    "Other",
  ];
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 mx-auto w-full max-w-md ">
          <h3 className="text-xl  mb-2">Add New Task</h3>
          <p className="text-gray-600 mb-6 border-b pb-5 border-gray-300">
            Please fill in the details of your new resource below.
          </p>

          <form className="flex flex-col gap-2">
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
                onChange={(e) =>
                  setResource({ ...resource, title: e.target.value })
                }
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
                onChange={(e) =>
                  setResource({ ...resource, resourceType: e.target.value })
                }
                required
              >
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="image">Image</option>
                <option value="link">Link</option>
                <option value="video">Video</option>
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
                onChange={(e) =>
                  setResource({ ...resource, subject: e.target.value })
                }
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
                  onChange={(e) =>
                    setResource({ ...resource, customSubject: e.target.value })
                  }
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
                    onChange={(e) =>
                      setResource({ ...resource, link: e.target.value })
                    }
                    required
                  />
                </>
              ) :  (
                <>
                  <label htmlFor="resource-file" className="block ">
                    Upload File
                  </label>
                  <label
                    htmlFor="resource-file"
                    className="w-full flex flex-col items-center justify-center p-6 mb-3 border-2 border-dashed border-gray-500 rounded cursor-pointer hover:bg-gray-50 transition"
                  >
                    <span className="text-gray-500">
                      Click to upload or drag file here
                    </span>
                    <input
                      id="resource-file"
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        setResource({ ...resource, file: e.target.files[0] })
                      }
                      required
                    />
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
                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 shadow-lg"
                >
                    Add Task
                </button>
                </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddResource;
