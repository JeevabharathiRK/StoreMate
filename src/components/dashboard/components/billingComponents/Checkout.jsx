import { useState, useRef } from "react";

export default function Checkout({ items, grandTotal, onClose, onConfirm }) {
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [showSelectCustomer, setShowSelectCustomer] = useState(false);
  const [customerContact, setCustomerContact] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [fetchingCustomer, setFetchingCustomer] = useState(false);
  const [isAddingOrders, setIsAddingOrders] = useState(false);
  const [customerError, setCustomerError] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    email: "",
    dob: "",
  });

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
        <body>${printContents}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const fetchCustomerByContact = async () => {
    setFetchingCustomer(true);
    setCustomerError("");
    setSelectedCustomer(null);
    try {
      const response = await fetch(
        `http://localhost/api/billing/customers?customerContact=${encodeURIComponent(customerContact)}`
      );
      if (!response.ok) throw new Error("Customer not found");
      const data = await response.json();
      setSelectedCustomer(data);
    } catch (err) {
      setCustomerError("Customer not found for this phone number.");
    } finally {
      setFetchingCustomer(false);
    }
  };

  const postNewCustomer = async () => {
    const { fname, lname, phone, address, email, dob } = newCustomer;
    if (!fname || !lname || !phone || !address || !email || !dob) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost/api/billing/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerFirstName: fname,
          customerLastName: lname,
          customerContact: phone,
          customerAddress: address,
          customerEmail: email,
          customerDOB: dob,
        }),
      });
      if (!response.ok) throw new Error("Failed to create customer");
      const data = await response.json();
      setSelectedCustomer(data);
      setShowNewCustomer(false);
      setShowSelectCustomer(true);
    } catch (err) {
      alert("Error creating customer: " + err.message);
    }
  };

  const checkoutOrder = async () => {

    setIsAddingOrders(true);

  for (const item of items) {
    if (item.qty > item.stock) {
      alert(`Insufficient stock for "${item.name}". Available: ${item.stock}, Requested: ${item.qty}`);
      return; // Stop checkout
    }
  } 

  const orderPayload = {
    customer: {
      customerId: selectedCustomer.customerId
    },
    orderDate: new Date().toISOString(),
    orderTotal: grandTotal,
    orderStatus: "CONFIRMED"
  };

  try {
    // Step 1: Create customer order
    const orderRes = await fetch("http://localhost/api/billing/customerOrders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload)
    });

    if (!orderRes.ok) throw new Error("Failed to create customer order");

    const createdOrder = await orderRes.json();
    const orderId = createdOrder.orderId;

    // Step 2: Add order items and update stock
    for (const item of items) {
      // Add item to order
      const itemPayload = item.productId ? {
        order: { orderId },
        product: { productId: item.productId },
        quantity: item.qty,
        price: item.price
      } : {
        order: { orderId },
        something : item.name,
        quantity: item.qty,
        price: item.price
      }

      const itemRes = await fetch("http://localhost/api/billing/orderItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemPayload)
      });

      if (!itemRes.ok) throw new Error(`Failed to add item: ${item.name}`);

      // Step 3: Update product stock
      if(item.productId){
        
        const updatedStock = item.stock - item.qty;
  
        const stockUpdateRes = await fetch("http://localhost/api/billing/updateProduct", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: item.productId,
            productStock: updatedStock
          })
        });
  
        if (!stockUpdateRes.ok) throw new Error(`Failed to update stock for ${item.name}`);
      }
    }

    alert("Order successfully placed!");
    } catch (err) {
    console.error("Checkout failed:", err.message);
    alert("Checkout failed: " + err.message);
    }
  };


  const renderCustomerCard = () =>
    selectedCustomer && (
      <div className="relative mt-4 bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col md:flex-row items-center gap-4 p-6 max-w-md">
        <button
          className="absolute top-2 right-2 bg-gray-200 hover:bg-red-500 text-gray-700 hover:text-white rounded-full w-7 h-7 flex items-center justify-center text-2xl font-bold shadow transition-colors p-0"
          title="Deselect Customer"
          onClick={() => setSelectedCustomer(null)}
        >
          ×
        </button>
        <div className="flex-shrink-0 bg-[#483AA0] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow">
          {selectedCustomer.customerFirstName?.[0] || "?"}
        </div>
        <div className="flex-1 w-full">
          <div className="font-bold text-lg text-[#483AA0] mb-1">
            {selectedCustomer.customerFirstName} {selectedCustomer.customerLastName}
          </div>
          <div className="grid gap-1 text-gray-700 text-sm">
            <div><b>Phone:</b> {selectedCustomer.customerContact}</div>
            <div><b>Email:</b> {selectedCustomer.customerEmail}</div>
            <div><b>Address:</b> {selectedCustomer.customerAddress}</div>
            <div><b>DOB:</b> {selectedCustomer.customerDOB}</div>
          </div>
        </div>
      </div>
    );

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
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} className="border-t border-gray-200 text-sm">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{item.barcode || "-"}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.qty}</td>
                  <td className="px-4 py-2">₹{item.price}</td>
                  <td className="px-4 py-2">₹{item.qty * item.price}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td colSpan={6}></td>
                <td className="px-4 py-2">Grand Total:</td>
                <td className="px-4 py-2">₹{grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Buttons */}
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
        <div className="mb-4 p-4">
          <h3 className="font-semibold mb-2">Create New Customer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {["fname", "lname", "phone", "address", "email", "dob"].map((field) => (
              <input
                key={field}
                type={field === "dob" ? "date" : field === "email" ? "email" : "text"}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                className="p-2 border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
                value={newCustomer[field]}
                onChange={(e) => setNewCustomer({ ...newCustomer, [field]: e.target.value })}
              />
            ))}
          </div>
          <button
            className="mt-3 bg-[#483AA0] hover:bg-[#4D55CC] text-white px-4 py-2 rounded"
            onClick={postNewCustomer}
          >
            Save Customer
          </button>
        </div>
      )}

      {/* Existing Customer Search */}
      {showSelectCustomer && !selectedCustomer && (
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
              className="w-24 bg-[#483AA0] hover:bg-[#4D55CC] text-white px-4 py-2 rounded"
              disabled={fetchingCustomer || !customerContact}
            >
              {fetchingCustomer ? (
                  <div className="w-18 h-1 relative overflow-hidden rounded mt-[0.50rem] mb-[0.50rem]">
                    <div className="absolute left-0 h-full w-1/3 bg-[#fff] rounded animate-[loadBar_1.5s_linear_infinite]"></div>
                  </div>
                ) : (
                  "Search"
                )}
            </button>
          </form>
          {customerError && <div className="text-red-600 mb-2">{customerError}</div>}
        </div>
      )}

      {/* Customer Card */}
      {renderCustomerCard()}

      {/* Confirm Buttons */}
      <div className="flex gap-4 justify-end mt-4">
        <button className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Cancel
        </button>
        <button
          className="bg-[#483AA0] hover:bg-[#4D55CC] text-white px-4 py-2 rounded"
          disabled={isAddingOrders}
          onClick={ async () => {
            if (!selectedCustomer) {
              alert("Please select or create a customer before confirming checkout.");
              return;
            }
            await checkoutOrder();
            handlePrint();
            onConfirm();
          }}
        >
          {isAddingOrders ? (
                  <div className="w-[127.5px] h-1 relative overflow-hidden rounded mt-[0.50rem] mb-[0.50rem]">
                    <div className="absolute left-0 h-full w-1/3 bg-[#fff] rounded animate-[loadBar_1.5s_linear_infinite]"></div>
                  </div>
                ) : (
                  "Confirm Checkout"
                )}
        </button>
      </div>
    </div>
  );
}
