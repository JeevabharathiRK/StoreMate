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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="bg-[#EDF2F7] min-h-screen flex p-0" style={{ height: "100vh" }}>
      {/* Sandwich button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#0E2148] text-white p-2 rounded"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label="Open sidebar"
      >
        {/* Simple hamburger icon */}
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect y="4" width="24" height="2" rx="1" fill="white" />
          <rect y="11" width="24" height="2" rx="1" fill="white" />
          <rect y="18" width="24" height="2" rx="1" fill="white" />
        </svg>
      </button>
      {/* Sidebar */}
      <div
        className={`
          bg-[#0E2148] w-100 p-8 text-white flex flex-col
          fixed top-0 left-0 h-full z-40 transition-transform duration-300
          md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          overflow-y-auto
        `}
        style={{ maxWidth: 320, minWidth: 220, height: "100vh" }}
      >
        <div className="flex items-center ml-2 mb-8">
          <img
            src="/favicon.svg"
            alt="StoreMate Logo"
            className="w-8 h-8 mr-3"
          />
          <span
            className="text-white text-4xl "
            style={{ fontFamily: "'Francois One', sans-serif" }}
          >
            StoreMate
          </span>
        </div>
        <ul className="flex flex-col gap-4 -ml-8 -mr-8 text-2xl leading-loose flex-1">
          {[
            {
              name: "Billing",
              icon: "https://img.icons8.com/deco-glyph/48/bill.png",
            },
            {
              name: "Stocks",
              icon: "https://img.icons8.com/sf-black-filled/64/garage-closed.png",
            },
            {
              name: "Leads",
              icon: "https://img.icons8.com/material-rounded/50/light-on.png",
            },
            {
              name: "FollowUps",
              icon: "https://img.icons8.com/ios-glyphs/30/envelope-love-1.png",
            },
            {
              name: "Analytics",
              icon: "https://img.icons8.com/ios-glyphs/30/combo-chart--v1.png",
            },
            {
              name: "Customers",
              icon: "https://img.icons8.com/ios-glyphs/30/user-group-man-man.png",
            },
            {
              name: "Suppliers",
              icon: "https://img.icons8.com/ios-filled/50/truck.png",
            },
          ].map((item) => (
            <li
              key={item.name}
              className={`flex items-center cursor-pointer w-full px-14 py-2 transition-colors ${
                activePage === item.name
                  ? "bg-[#483AA0] font-semibold"
                  : "hover:bg-[#483AA0]"
              }`}
              style={{ borderRadius: 0 }}
              onClick={() => {
                setActivePage(item.name);
                setSidebarOpen(false);
              }}
            >
              <img
                src={item.icon}
                alt={`${item.name} icon`}
                className="w-8 h-8 mr-4"
                style={{ filter: "invert(1)" }}
              />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main content */}
      <div
        className="p-6 bg-[#e3effa] w-full rounded-r-2xl md:ml-0 overflow-y-auto"
        style={{ height: "100vh" }}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
