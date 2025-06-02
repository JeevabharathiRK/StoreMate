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
  const [newCustomer, setNewCustomer] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    email: "",
  });
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const printRef = useRef();

  const filteredCustomers = customers.filter(
    (c) =>
      c.fname.toLowerCase().includes(search.toLowerCase()) ||
      c.lname.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

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
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.qty}</td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">{item.qty * item.price}</td>
                </tr>
              ))}
              <tr className="border-t border-gray-200 text-sm bg-gray-100">
                <td className="px-4 py-2" colSpan={5}>
                  <span className="font-bold">Grand Total</span>
                </td>
                <td className="px-4 py-2 font-bold" colSpan={2}>
                  ₹{grandTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer selection/creation */}
      <div className="flex gap-4 mb-4">
        <button
          className="bg-[#483AA0] text-white px-4 py-2 rounded"
          onClick={() => {
            setShowNewCustomer(true);
            setShowSelectCustomer(false);
          }}
        >
          + New Customer
        </button>
        <button
          className="bg-[#E3D095] text-gray-700 px-4 py-2 rounded"
          onClick={() => {
            setShowSelectCustomer(true);
            setShowNewCustomer(false);
          }}
        >
          Select Existing Customer
        </button>
      </div>

      {/* New Customer Form */}
      {showNewCustomer && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Create New Customer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="First Name"
              className="p-2 border rounded"
              value={newCustomer.fname}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, fname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 border rounded"
              value={newCustomer.lname}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, lname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              className="p-2 border rounded"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              className="p-2 border rounded"
              value={newCustomer.address}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, address: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded"
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
            />
          </div>
          <button
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => {
              onAddCustomer(newCustomer);
              setShowNewCustomer(false);
            }}
          >
            Save Customer
          </button>
        </div>
      )}

      {/* Select Existing Customer */}
      {showSelectCustomer && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Select Existing Customer</h3>
          <input
            type="text"
            placeholder="Search by name or phone"
            className="p-2 border rounded mb-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="max-h-40 overflow-y-auto">
            {filteredCustomers.map((c) => (
              <div
                key={c.id}
                className={`p-2 cursor-pointer hover:bg-gray-200 rounded ${
                  selectedCustomer && selectedCustomer.id === c.id
                    ? "bg-gray-300"
                    : ""
                }`}
                onClick={() => setSelectedCustomer(c)}
              >
                {c.fname} {c.lname} - {c.phone}
              </div>
            ))}
          </div>
          <button
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
            disabled={!selectedCustomer}
            onClick={() => {
              onSelectCustomer(selectedCustomer);
              setShowSelectCustomer(false);
            }}
          >
            Select Customer
          </button>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-4 justify-end mt-4">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            onConfirm();
            handlePrint();
          }}
          disabled={!selectedCustomer && !showNewCustomer}
        >
          Confirm Checkout
        </button>
      </div>
    </div>
  );
}