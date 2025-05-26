import { useEffect, useState } from "react";

export default function Billing() {
  const [barcodeBuffer, setBarcodeBuffer] = useState("");
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [manualItem, setManualItem] = useState({
    name: "",
    description: "",
    category: "",
    qty: 1,
    price: 0,
  });
  const [customer, setCustomer] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        if (barcodeBuffer.trim()) {
          addItemByBarcode(barcodeBuffer.trim());
          setBarcodeBuffer("");
        }
        e.preventDefault();
      } else if (/^[a-zA-Z0-9]$/.test(e.key)) {
        setBarcodeBuffer((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [barcodeBuffer]);

  const addItemByBarcode = (barcode) => {
    const product = {
      id: Date.now(),
      barcode,
      name: `Product ${barcode}`,
      description: "Sample description",
      category: "General",
      qty: 1,
      price: 100,
    };
    setItems((prevItems) => [...prevItems, product]);
  };

  const updateQty = (id, qty) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: Number(qty) } : item
      )
    );
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const grandTotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = () => {
    const bill = { items, customer };
    console.log("Final Bill:", bill);
    setItems([]);
    setCustomer({ fname: "", lname: "", phone: "", address: "", email: "" });
    setShowCheckout(false);
  };

  const handleAddManualItem = () => {
    if (!manualItem.name || manualItem.price <= 0 || manualItem.qty <= 0) {
      alert("Please fill all fields with valid values.");
      return;
    }

    const newItem = {
      id: Date.now(),
      ...manualItem,
      barcode: null,
    };

    setItems((prev) => [...prev, newItem]);
    setManualItem({ name: "", description: "", category: "", qty: 1, price: 0 });
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" text-[#1F2937]">
      <h2 className="text-2xl font-bold mb-4">Billing</h2>

      {/* Manual Item Entry */}
      <div className="mb-6 border p-4 rounded bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Add Item Manually</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={manualItem.name}
            onChange={(e) => setManualItem({ ...manualItem, name: e.target.value })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={manualItem.category}
            onChange={(e) => setManualItem({ ...manualItem, category: e.target.value })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={manualItem.description}
            onChange={(e) => setManualItem({ ...manualItem, description: e.target.value })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={manualItem.price}
            onChange={(e) => setManualItem({ ...manualItem, price: Number(e.target.value) })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={manualItem.qty}
            onChange={(e) => setManualItem({ ...manualItem, qty: Number(e.target.value) })}
            className="border px-4 py-2 rounded"
          />
          <button
            onClick={handleAddManualItem}
            className="cursor-pointer col-span-2 bg-green-600 text-white px-6 py-2 rounded"
          >
            Add Manually
          </button>
        </div>
      </div>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search items in bill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 border px-4 py-2 rounded w-full"
      />

      {/* Billing Table */}
      <table className="w-full mb-6 border text-left">
        <thead className="bg-[#F3F4F6]">
          <tr>
            <th className="p-2">S.No</th>
            <th className="p-2">Product Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Category</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price</th>
            <th className="p-2">Total</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                No matching items found
              </td>
            </tr>
          ) : (
            filteredItems.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">
                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    onChange={(e) => updateQty(item.id, e.target.value)}
                    className="border px-2 py-1 w-16 rounded"
                  />
                </td>
                <td className="p-2">₹{item.price}</td>
                <td className="p-2">₹{item.qty * item.price}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
          {filteredItems.length > 0 && (
            <tr className="font-bold border-t bg-gray-100">
              <td colSpan="6" className="p-2 text-right">
                Grand Total
              </td>
              <td className="p-2">₹{grandTotal}</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>

      {items.length > 0 && (
        <button
          onClick={() => setShowCheckout(true)}
          className="cursor-pointer bg-[#2563EB] text-white px-6 py-2 rounded"
        >
          Checkout
        </button>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="shadow-2xl fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h3 className="text-xl font-bold mb-4">Customer Details</h3>
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              value={customer.fname}
              onChange={handleCustomerChange}
              className="border px-4 py-2 rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              value={customer.lname}
              onChange={handleCustomerChange}
              className="border px-4 py-2 rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleCustomerChange}
              className="border px-4 py-2 rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleCustomerChange}
              className="border px-4 py-2 rounded w-full mb-2"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={handleCustomerChange}
              className="border px-4 py-2 rounded w-full mb-4"
              rows="3"
              required
            ></textarea>
            <button
              onClick={handleSubmit}
              className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded mr-4"
            >
              Print & Submit
            </button>
            <button
              onClick={() => setShowCheckout(false)}
              className="cursor-pointer bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
