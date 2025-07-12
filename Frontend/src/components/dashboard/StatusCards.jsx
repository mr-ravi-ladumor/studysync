import React from "react";
import { CircleCheck, Clock4, Bookmark } from "lucide-react";

const cardsData = [
  {
    title: "Completed Tasks",
    value: 24,
    percentageChange: "+12% from last week",
    progress: 70,
    icon: <CircleCheck className="text-green-500" />,
    color: "#22c55e",
  },
  {
    title: "Pending Tasks",
    value: 10,
    percentageChange: "+3 due Today",
    progress: 30,
    icon: <Clock4 className="text-yellow-500" />,
    color: "#eab308",
  },
  {
    title: "Study Hours",
    value: 32.5,
    percentageChange: "this week",
    progress: 70,
    icon: <Clock4 className="text-blue-600" />,
    color: "#2563eb",
  },
  {
    title: "Resources Saved",
    value: 40,
    percentageChange: "across 8 courses",
    progress: 30,
    icon: <Bookmark className="text-purple-600" />,
    color: "#7c3aed",
  },
];

function StatusCards() {
  return (
    <>
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="card flex flex-col gap-6 w-70 bg-white p-5 rounded-xl m-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[17px] font-medium">{card.title}</span>
            <span>{card.icon}</span>
          </div>
          {/* Displaying the number */}
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">{card.value}</span>
            <span
              className={`text-sm font-medium`}
              style={{ color: card.color }}
            >
              {card.percentageChange}
            </span>
          </div>
          <div>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`bg-${card.color} h-3 rounded-full`}
                style={{
                  width: `${card.progress}%`,
                  backgroundColor: card.color,
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
      </>
  );
}

export default StatusCards;
