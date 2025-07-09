import { useAuth } from "../context/AuthContext";
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
    icon: <Clock4  className="text-blue-600" />,
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

function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to access the dashboard.</p>;
  }
  //   console.log(user);
  return (
    <div className="h-screen flex flex-col gap-5 ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-medium">Dashboard</h3>
          <p className="text-gray-600 text-medium">
            Welcome back, {user.firstname}! Here's an overview of your academic
            progress.
          </p>
        </div>
        <button className=" bg-green-500 text-white px-4 py-1 rounded-lg flex items-center gap-2 justify-center">
          <span className="text-2xl mb-1">+</span> Add New Task
        </button>
      </div>
      <main>
        <section className="cards flex  items-center gap-3">
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
                {console.log(card.color)}
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
        </section>
        <div className="extra"></div>
      </main>
    </div>
  );
}

export default Dashboard;

{
  /* Card for Total Tasks */
}
