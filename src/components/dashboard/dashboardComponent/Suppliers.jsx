import React, { useState } from "react";

const initialSuppliers = [
  {
    id: 1,
    name: "Acme Corp",
    products: "Call",
    emailType: "Inbound",
    contact: "(+91)9898989898",
    lastStockAt: "2025-05-21 13:09:02",
  },
  {
    id: 2,
    name: "Gamma Ltd",
    products: "Email",
    emailType: "Outbound",
    contact: "(+91)9898989898",
    lastStockAt: "NILL",
  },
];

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [formVisible, setFormVisible] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    products: "",
    emailType: "",
    contact: "",
    lastStockAt: "NILL",
  });

  const handleInputChange = (e) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  };

  const handleAddSupplier = () => {
    setSuppliers([
      ...suppliers,
      { ...newSupplier, id: suppliers.length + 1 },
    ]);
    setNewSupplier({
      name: "",
      products: "",
      emailType: "",
      contact: "",
      lastStockAt: "NILL",
    });
    setFormVisible(false);
  };

  const handleSort = () => {
    const sorted = [...suppliers].sort((a, b) => {
      const aDate = a.lastStockAt === "NILL" ? 0 : new Date(a.lastStockAt);
      const bDate = b.lastStockAt === "NILL" ? 0 : new Date(b.lastStockAt);
      return aDate - bDate;
    });
    setSuppliers(sorted);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-4">Suppliers</h2>

      <div className="mb-4 flex items-center gap-4">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={() => setFormVisible(true)}
        >
          Create new Supplier
        </button>
        <span className="text-gray-500">(or)</span>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={() => alert("Showing existing suppliers")}
        >
          View existing suppliers
        </button>
      </div>

      {formVisible && (
        <div className="bg-white shadow p-4 rounded mb-6">
          <h3 className="text-xl font-semibold mb-3">New Supplier Form</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              name="name"
              placeholder="Name"
              value={newSupplier.name}
              onChange={handleInputChange}
            />
            <input
              className="border p-2 rounded"
              name="products"
              placeholder="Products"
              value={newSupplier.products}
              onChange={handleInputChange}
            />
            <input
              className="border p-2 rounded"
              name="emailType"
              placeholder="Email Type"
              value={newSupplier.emailType}
              onChange={handleInputChange}
            />
            <input
              className="border p-2 rounded"
              name="contact"
              placeholder="Contact"
              value={newSupplier.contact}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleAddSupplier}
          >
            Add Supplier
          </button>
        </div>
      )}

      <h4 className="text-xl font-medium mb-2">Stock in history</h4>
      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">S. No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Products</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2 flex items-center gap-1">
              Last Stock At
              <button onClick={handleSort} title="Sort by date">⇅</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s, i) => (
            <tr key={s.id} className="text-center">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">{s.products}</td>
              <td className="border px-4 py-2">{s.emailType}</td>
              <td className="border px-4 py-2">{s.contact}</td>
              <td className="border px-4 py-2">{s.lastStockAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}