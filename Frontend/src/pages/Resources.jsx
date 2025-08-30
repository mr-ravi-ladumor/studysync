import React, { useState } from "react";
import ResourceCards from "../components/resources/ResourceCards.jsx";
import { useEffect } from "react";
import AddResource from "../components/resources/AddResource.jsx";
import EditResource from "../components/resources/EditResource.jsx";
import ViewResource from "../components/resources/ViewResource.jsx";

const filterChips = [
    { label: "All Resources", value: "all" },
    { label: "Documents", value: "document" },
    { label: "Images", value: "image" },
    { label: "Links", value: "link" },
    { label: "Other", value: "other" },
];

function Resources() {
    const [showAddResource, setShowAddResource] = useState(false);
    const [showEditResource, setShowEditResource] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [resources, setResources] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [viewing, setViewing] = useState(null);

    useEffect(() => {
        // Fetch resources from the backend when the component mounts
        const fetchResources = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/resources`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const allResourcesData = await response.json();
                if (!response.ok) {
                    throw new Error("Failed to fetch resources");
                }
                setResources(allResourcesData.data);
                // console.log("Resources fetched successfully:",allResourcesData.data);
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };
        fetchResources();
    }, []);

    const handleView = (resource) => {
        setViewing(resource);
    };

    const handleEdit = (resource) => {
        setSelectedResource(resource);
        setShowEditResource(true);
    };

    const handleDelete = async (resourceId) => {
        if (!window.confirm("Are you sure you want to delete this resource?")) {
            return;
        }

        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/resources/delete/${resourceId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const deleteResult = await response.json();
            
            if (!response.ok) {
                throw new Error(
                    deleteResult.message || "Failed to delete resource"
                );
            }

            setResources((prevResources) =>
                prevResources.filter((res) => res._id !== resourceId)
            );

            alert("Resource deleted successfully!");
        } catch (error) {
            console.error("Error deleting resource:", error);
            alert("Failed to delete resource. Please try again.");
        }
    };
    return (
        <div className="h-screen flex flex-col gap-5 ">
            <div className="header flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-medium">Resources</h3>
                    <p className="text-gray-600">
                        Access and organize all your study materials and
                        documents in one place.
                    </p>
                </div>
                <div className="">
                    <button
                        type="button"
                        onClick={() => {
                            setShowAddResource(true);
                        }}
                        className=" bg-green-500 text-white px-4 py-1 rounded-lg flex items-center gap-2 justify-center hover:bg-green-600 transition-colors duration-300 shadow-lg"
                    >
                        <span className="text-2xl mb-1">+</span> Add Resource
                    </button>{" "}
                    {showAddResource && (
                        <AddResource
                            setShowAddResource={setShowAddResource}
                            setResources={setResources}
                        />
                    )}
                    {showEditResource && selectedResource && (
                        <EditResource
                            resourceData={selectedResource}
                            setResources={setResources}
                            setShowEditResource={setShowEditResource}
                            setSelectedResource={setSelectedResource}
                        />
                    )}
                </div>
            </div>
            <div className="filter-chips">
                <div className="ml-1 mt-3 chip flex items-center gap-5 ">
                    {filterChips.map((chip) => (
                        <button
                            key={chip.value}
                            type="button"
                            onClick={() => setActiveFilter(chip.value)}
                            className={`text-[15px] text-gray-800 rounded-3xl py-[5px] px-[10px] text-center transition-colors duration-200 ${
                                activeFilter === chip.value
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            {chip.label}
                        </button>
                    ))}
                </div>
            </div>{" "}
            <div className="mt-4 cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <ResourceCards
                    resources={
                        activeFilter === "all"
                            ? resources
                            : resources.filter(
                                  (r) => r.resourceType === activeFilter
                              )
                    }
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
            {viewing && (
                <ViewResource
                    resource={viewing}
                    onClose={() => setViewing(null)}
                />
            )}
            <div className="pagination"></div>
        </div>
    );
}

export default Resources;
