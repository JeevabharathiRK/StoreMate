import { useState, useRef } from "react";

export default function Checkout({
  items,
  grandTotal,
  customers,
  onAddCustomer,
  onSelectCustomer,
  onClose,
  onConfirm,
}) {
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [showSelectCustomer, setShowSelectCustomer] = useState(false);
  const [customerContact, setCustomerContact] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [fetchingCustomer, setFetchingCustomer] = useState(false);
  const [customerError, setCustomerError] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    email: "",
  });
  const [search, setSearch] = useState("");
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(`
      <html>
        <head>
          <title>Bill</title>
          <style>
            body { font-family: sans-serif; padding: 24px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background: #f3f3f3; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Fetch customer info by phone number
  const fetchCustomerByContact = async () => {
    setFetchingCustomer(true);
    setCustomerError("");
    setSelectedCustomer(null);
    try {
      const response = await fetch(
        `http://localhost/api/billing/customers?customerContact=${encodeURIComponent(
          customerContact
        )}`
      );
      if (!response.ok) {
        throw new Error("Customer not found");
      }
      const data = await response.json();
      setSelectedCustomer(data);
    } catch (err) {
      setCustomerError("Customer not found for this phone number.");
    } finally {
      setFetchingCustomer(false);
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg w-full max-w-full min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Bill Table */}
      <div ref={printRef}>
        <div className="overflow-x-auto rounded-md shadow-sm mb-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Barcode</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Product Description</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id} className="border-t border-gray-200 text-sm">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{item.barcode || "-"}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.qty}</td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">{item.qty * item.price}</td>
                </tr>
              ))}
              <tr className="border-t border-gray-200 text-sm bg-gray-100">
                <td className="px-4 py-2" colSpan={6}></td>
                <td className="px-4 py-2" colSpan={1}>
                  <span className="font-bold">Grand Total :</span>
                </td>
                <td className="px-4 py-2 font-bold" colSpan={1}>
                  ₹{grandTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer selection/creation */}
      <div className="flex gap-4 mb-4">
        <button
          className="bg-[#483AA0] hover:bg-[#4D55CC] text-white px-4 py-2 rounded"
          onClick={() => {
            setShowNewCustomer(true);
            setShowSelectCustomer(false);
            setSelectedCustomer(null);
          }}
        >
          + New Customer
        </button>
        <button
          className="bg-[#E3D095] hover:bg-[#EFDCAB] text-gray-700 px-4 py-2 rounded"
          onClick={() => {
            setShowSelectCustomer(true);
            setShowNewCustomer(false);
            setSelectedCustomer(null);
          }}
        >
          Select Existing Customer
        </button>
      </div>

      {/* New Customer Form */}
      {showNewCustomer && (
        <div className="mb-4 p-4 ">
          <h3 className="font-semibold mb-2">Create New Customer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="First Name"
              className="p-2 border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
              value={newCustomer.fname}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, fname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
              value={newCustomer.lname}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, lname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              className="p-2 border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              className="p-2 border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
              value={newCustomer.address}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, address: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
            />
          </div>
          <button
            className="mt-3 bg-[#483AA0] hover:bg-[#4D55CC] text-white px-4 py-2 rounded"
            onClick={() => {
              onAddCustomer(newCustomer);
              setShowNewCustomer(false);
            }}
          >
            Save Customer
          </button>
        </div>
      )}

      {/* Select Existing Customer - Phone Input and Card */}
      {showSelectCustomer && (
        <>
          {/* Show input and parent only if no customer is selected */}
          {!selectedCustomer && (
            <div className="mb-4 p-4">
              <h3 className="font-semibold mb-2">Find Existing Customer</h3>
              <form
                className="flex gap-2 mb-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!fetchingCustomer && customerContact) {
                    fetchCustomerByContact();
                  }
                }}
              >
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  className="p-2 border border-gray-300 rounded flex-1 outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
                  value={customerContact}
                  onChange={(e) => setCustomerContact(e.target.value)}
                  disabled={fetchingCustomer}
                />
                <button
                  type="submit"
                  className="bg-[#483AA0] hover:bg-[#4D55CC] text-white px-4 py-2 rounded"
                  disabled={fetchingCustomer || !customerContact}
                >
                  {fetchingCustomer ? "Searching..." : "Search"}
                </button>
              </form>
              {customerError && (
                <div className="text-red-600 mb-2">{customerError}</div>
              )}
            </div>
          )}
          {/* Show only the card, without the parent box, after search */}
          {selectedCustomer && (
            <div className="relative mt-4 bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col md:flex-row items-center gap-4 p-6 max-w-md">
              {/* X button in top right */}
              <button
                className="absolute top-2 right-2 bg-gray-200 hover:bg-red-500 text-gray-700 hover:text-white rounded-full w-7 h-7 flex items-center justify-center text-2xl font-bold shadow transition-colors p-0"
                title="Deselect Customer"
                onClick={() => setSelectedCustomer(null)}
                style={{ lineHeight: 1, padding: 0 }}
              >
                <span className="flex items-center justify-center w-full h-full">
                  ×
                </span>
              </button>
              <div className="flex-shrink-0 bg-[#483AA0] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow">
                {selectedCustomer.customerFirstName?.[0] || "?"}
              </div>
              <div className="flex-1 w-full">
                <div className="font-bold text-lg text-[#483AA0] mb-1">
                  {selectedCustomer.customerFirstName}{" "}
                  {selectedCustomer.customerLastName}
                </div>
                <div className="grid grid-cols-1 gap-1 text-gray-700 text-sm">
                  <div>
                    <span className="font-semibold">Phone:</span>{" "}
                    {selectedCustomer.customerContact}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    {selectedCustomer.customerEmail}
                  </div>
                  <div>
                    <span className="font-semibold">Address:</span>{" "}
                    {selectedCustomer.customerAddress}
                  </div>
                  <div>
                    <span className="font-semibold">DOB:</span>{" "}
                    {selectedCustomer.customerDOB}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Action buttons */}
      <div className="flex gap-4 justify-end mt-4">
        <button
          className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-[#483AA0] hover:bg-[#4D55CC] text-white px-4 py-2 rounded"
          onClick={() => {
            if (!selectedCustomer && !showNewCustomer) {
              alert("Please select or create a customer before confirming checkout.");
              return;
            }
            onConfirm();
            handlePrint();
          }}
          disabled={false} // Always enabled to allow alert
        >
          Confirm Checkout
        </button>
      </div>
    </div>
  );
}