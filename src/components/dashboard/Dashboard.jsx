// import Overall from "./dashboardComponent/Overall";

// function Dashboard() {
//   return (
//     <>
//       <div className="bg-[#EDF2F7] min-h-screen flex p-10 ">
       
//         <div className="bg-[#1F2937] rounded-l-2xl w-60 p-6 text-white flex flex-col">
//           <div className="ml-2 mb-8 text-white text-2xl font-semibold">
//             RETAIL CRM
//           </div>
//           <ul className="flex flex-col gap-4 ml-2 text-lg">
//             <li className="cursor-pointer hover:text-amber-400">Dashboard</li>
//             <li className="cursor-pointer hover:text-amber-400">Billing / Sales</li>
//             <li className="cursor-pointer hover:text-amber-400">Customers</li>
//             <li className="cursor-pointer hover:text-amber-400">Inventory</li>
//           </ul>
//         </div>

//         {/* Main content */}
//         <div className="p-6 bg-[#e3effa] w-[100%] rounded-r-2xl">
//            <Overall />
           
//         </div>


//       </div>
//     </>
//   );
// }

// export default Dashboard;






// import Overall from "./dashboardComponent/Overall";

// function Dashboard() {
//   return (
//     <div className="bg-[#EDF2F7] min-h-screen flex p-10 ">
//       <div className="bg-[#1F2937] rounded-l-2xl w-60 p-6 text-white flex flex-col">
//         <div className="ml-2 mb-8 text-white text-2xl font-semibold">
//           RETAIL CRM
//         </div>
//         <ul className="flex flex-col gap-4 ml-2 text-lg">
//           <li className="cursor-pointer hover:text-amber-400">Dashboard</li>
//           <li className="cursor-pointer hover:text-amber-400">Billing / Sales</li>
//           <li className="cursor-pointer hover:text-amber-400">Customers</li>
//           <li className="cursor-pointer hover:text-amber-400">Inventory</li>
//         </ul>
//       </div>

//       {/* Main content */}
//       <div className="p-6 bg-[#e3effa] w-full rounded-r-2xl">
//         <Overall />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import { useState } from "react";
import Overall from "./dashboardComponent/Overall";
import BillingSales from "./dashboardComponent/BillingSales";
import Customers from "./dashboardComponent/Customers";
import Inventory from "./dashboardComponent/Inventory";

function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  // Helper to render the main content based on activePage
  function renderContent() {
    switch (activePage) {
      case "Dashboard":
        return <Overall />;
      case "Billing / Sales":
        return <BillingSales />;
      case "Customers":
        return <Customers />;
      case "Inventory":
        return <Inventory />;
      default:
        return <Overall />;
    }
  }

  return (
    <div className="bg-[#EDF2F7] min-h-screen flex p-10">
      <div className="bg-[#1F2937] rounded-l-2xl w-60 p-6 text-white flex flex-col">
        <div className="ml-2 mb-8 text-white text-2xl font-semibold">StoreMate</div>
        <ul className="flex flex-col gap-4 ml-2 text-lg">
          {["Dashboard", "Billing / Sales", "Customers", "Inventory"].map((item) => (
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
