import { useState, useEffect } from "react";
import Billing from "./components/Billing";
import Stocks from "./components/Stocks";
import Leads from "./components/Leads";
import FollowUps from "./components/FollowUps";
import Analytics from "./components/Analytics";
import Customers from "./components/Customers";
import Suppliers from "./components/Suppliers";

function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  useEffect(() => {
    setActivePage("Billing");
  }, []);

  // Helper to render the main content based on activePage
  function renderContent() {
    switch (activePage) {
      case "Billing":
        return <Billing />;
      case "Stocks":
        return <Stocks />;
      case "Leads":
        return <Leads />;
      case "FollowUps":
        return <FollowUps />;
      case "Analytics":
        return <Analytics />;
      case "Customers":
        return <Customers />;
      case "Suppliers":
        return <Suppliers />;
      default:
        return <Billing />;
    }
  }

  return (
    <div className="bg-[#EDF2F7] min-h-screen flex p-10">
      <div className="bg-[#1F2937] rounded-l-2xl w-60 p-6 text-white flex flex-col">
        <div className="ml-2 mb-8 text-white text-2xl font-semibold">StoreMate</div>
        <ul className="flex flex-col gap-4 ml-2 text-lg">
          {["Billing", "Stocks", "Leads", "FollowUps", "Analytics", "Customers", "Suppliers"].map((item) => (
            <li
              key={item}
              className={`cursor-pointer hover:text-amber-400 ${
                activePage === item ? "text-amber-400 font-semibold" : ""
              }`}
              onClick={() => setActivePage(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="p-6 bg-[#e3effa] w-full rounded-r-2xl">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;
